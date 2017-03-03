import React, {Component} from 'react'
import {Table, BettingKey, CardZone, Card, Controls, Button, Bet, PayTable, PayRow, Text, Suit, KeyRow, Result, KeyTable} from '../styled'
import SocketIO from 'socket.io-client'

//'http://dev-casino.gamesmart.com'
//'http://localhost:3000'
export default class VideoPoker extends Component {

  state = {
    cards: [],
    bet: 1,
    discard: Array(5).fill(true),
    payTable: [],
    maxBet: 3,
    gameOver: true,
    credits: 100
  }

  constructor(props) {
    super(props)
    this.io = SocketIO('http://dev-casino.gamesmart.com')
    this.io.on('styling', (config) => {
      console.log(config)
      if (config) {
        this.setState({styling: config})
      }
    })
    this.io.on('payTable', (payTableObject) => {
      let payTable = []
      // eslint-disable-next-line
      for (let hand in payTableObject) {
        payTable.push({[hand]: payTableObject[hand]})
      }
      this.setState({payTable})
    })
    this.io.on('openingHand', (object) => {
      this.setState({
        cards: object.playerHand,
        currentValue: object.currentValue.winningVideoPokerHand,
        gameOver: false,
        discard: Array(5).fill(true),
      })
    })
    this.io.on('result', (object) => {
      this.setState((prevState) => {
        let credits = prevState.credits + object.winnings
        return {
          cards: object.playerHand,
          winningHand: object.result.winningVideoPokerHand,
          gameOver: true,
          credits
        }
      })
    })
  }

  betOne = () => {
    let {maxBet} = this.state
    this.setState( (prevState, props)=> {
      let bet = prevState.bet + 1
      if (bet > maxBet) {
        bet = 1
      }
      return {
        bet,
        currentValue: false,
        winningHand: false,
        cards: []
      }
    })
  }

  betMax = () => {
    let {maxBet} = this.state
    this.setState({
      bet: maxBet,
      currentValue: false,
      winningHand: false,
      cards: []
    })
  }

  play = () => {
    let {bet} = this.state
    this.setState( (prevState) => {
      let credits = prevState.credits - prevState.bet
      return {
        credits,
        currentValue: false,
        winningHand: false,
      }
    })
    this.io.emit('newGame', {bet})
  }

  hold = (index) => {
    this.setState( (prevState, props)=> {
      let discard = prevState.discard
      discard[index] = !discard[index]
      return {
        discard
      }
    })
  }

  swap = () => {
    let {discard} = this.state
    this.setState({
      discard: Array(5).fill(true),
      currentValue: false
    })
    this.io.emit('swap', discard)
  }


  get cardList () {
    let {cards, discard, gameOver, styling} = this.state
    if (!styling) {
      return cards.map((card, index)=>(
        <Card
          key={index}
          onClick={()=>this.hold(index)}
          discard={(discard[index])}
          gameOver={gameOver}
        >
          <Text>{card.text}</Text>
          <Suit
            suit={card.suit}
          >
            {card.unicode}
          </Suit>
        </Card>
      ))
    } else {
      return cards.map((card, index)=>(
        <Card
          key={index}
          onClick={()=>this.hold(index)}
          discard={(discard[index])}
          gameOver={gameOver}
          cardUrl={styling.cardUrl}
        />
      ))
    }

  }

  get payTables () {
    let {payTable, maxBet, bet, currentValue, winningHand} = this.state

    let payTables = []
    payTables.push(
      <KeyTable
        key={0}
        multiplier={false}
        bet={bet}
      >
        {payTable.map(payout => {
          let key = Object.keys(payout).toString()
          return (
            <KeyRow
              key={key}
              currentValue={(currentValue === key || winningHand === key)}
            >
                {key}
            </KeyRow>
          )
        })}
      </KeyTable>
    )
    for (let multiplier = 1; multiplier <= maxBet; multiplier++) {
      payTables.push(
        <PayTable
          key={multiplier}
          multiplier={multiplier}
          bet={bet}
        >
          {payTable.map(payout => {
            let key = Object.keys(payout).toString()
            return (
              <PayRow
                key={key}
                currentValue={( (bet === multiplier) && (currentValue === key || winningHand === key))}
              >
                  {payout[key] * multiplier}
              </PayRow>
            )
          })}
        </PayTable>
      )
    }
    return payTables
  }

  render() {
    let {bet, cards, gameOver, credits, winningHand} = this.state
    let {betOne, play, cardList, swap, payTables, betMax} = this
    return (
      <Table>
        <BettingKey>
            {payTables}
        </BettingKey>
        <Result>
          {(gameOver && winningHand) ? winningHand : ''}
        </Result>
        <CardZone>
          {cardList}
        </CardZone>
        <Controls>
          <Button
            onClick={betOne}
            disabled={!gameOver}
          >
            +1
          </Button>
          <Bet>
            Bet {bet}
          </Bet>
          <Button
            onClick={betMax}
            disabled={!gameOver}
          >
            Bet Max
          </Button>
          <Bet>
          Credits {credits}
          </Bet>
          <Button
            onClick={(cards.length < 1 || gameOver) ? play : swap}
          >
            {(cards.length < 1 || gameOver) ? "Deal" : "Swap"}
          </Button>
        </Controls>
      </Table>
    )
  }
}
