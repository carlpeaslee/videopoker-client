import React, {Component} from 'react'
import {Table, BettingKey, CardZone, Card, Controls, Button, Bet, PayTable, PayRow, Text, Suit, KeyRow, Result, KeyTable} from 'styled'
import SocketIO from 'socket.io-client'

//'http://dev-casino.gamesmart.com'
//'http://localhost:3000'
export default class VideoPoker extends Component {

  /* === LIFECYCLES === */

  state = {
    cards: [],
    bet: 1,
    discard: Array(5).fill(true),
    payTable: [],
    maxBet: 5,
    gameOver: true,
    credits: 100,
  }

  constructor(props) {
    super(props)
    this.initializeSocket()
    fetch('http://dev-casino.gamesmart.com/videopoker')
  }

  /* === INITIALIZATION FUNCTIONS === */

  initializeSocket = () => {
    this.io = SocketIO('http://dev-casino.gamesmart.com/videopoker')
    this.io.on('theme', this.setTheme)
    this.io.on('payTable', this.setPayTable)
    this.io.on('openingHand', this.loadOpeningHand)
    this.io.on('result', this.loadResult)
  }

  loadResult = (resultObject = {}) => {
    this.setState((prevState) => {
      let credits = prevState.credits + resultObject.winnings
      return {
        cards: resultObject.playerHand,
        winningHand: resultObject.result.winningVideoPokerHand,
        gameOver: true,
        credits
      }
    })
  }

  loadOpeningHand = (handObject = {}) => {
    this.setState({
      cards: handObject.playerHand,
      gameOver: false,
      discard: Array(5).fill(true),
    })
  }

  setTheme = (theme) => this.setState({...theme})

  setPayTable = (payTableObject) => {
    let payTable = [] // eslint-disable-next-line
    for (let hand in payTableObject) {
      payTable.push({[hand]: payTableObject[hand]})
    }
    this.setState({payTable})
  }

  /* === USER ACTIONS ===*/

  betMax = () => {
    let {maxBet} = this.state
    this.setState({
      bet: maxBet,
      winningHand: false,
      cards: []
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
        winningHand: false,
        cards: []
      }
    })
  }

  hold = (index) => {
    if (!this.state.gameOver) {
      this.setState( (prevState, props)=> {
        let discard = prevState.discard
        discard[index] = !discard[index]
        return {
          discard
        }
      })
    }
  }

  play = () => {
    let {bet} = this.state
    this.setState( (prevState) => {
      let credits = prevState.credits - prevState.bet
      return {
        credits,
        winningHand: false,
      }
    })
    this.io.emit('newGame', {bet})
  }

  swap = () => {
    let {discard} = this.state
    this.setState({
      discard: Array(5).fill(true),
    })
    this.io.emit('swap', discard)
  }

  /* === ELEMENT GETTERS === */

  get cardList () {
    let {cards, discard, gameOver, theme, cardUrl} = this.state
    if (!theme) {
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
          cardUrl={cardUrl}
        />
      ))
    }
  }

  get payTables () {
    let {payTable, maxBet, bet, winningHand} = this.state
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
              currentValue={(winningHand === key)}
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
                currentValue={( bet === multiplier && winningHand === key)}
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
    let {bet, cards, gameOver, credits, winningHand, background, button} = this.state
    let {betOne, play, cardList, swap, payTables, betMax} = this
    return (
      <Table
        theme={background}
        id={'table'}
      >
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
            theme={button}
          >
            +1
          </Button>
          <Bet>
            Bet {bet}
          </Bet>
          <Button
            onClick={betMax}
            disabled={!gameOver}
            theme={button}
            id={'maxBet'}
          >
            Bet Max
          </Button>
          <Bet>
          Credits {credits}
          </Bet>
          <Button
            onClick={(cards.length < 1 || gameOver) ? play : swap}
            theme={button}
          >
            {(cards.length < 1 || gameOver) ? "Deal" : "Swap"}
          </Button>
        </Controls>
      </Table>
    )
  }
}
