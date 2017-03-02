import React, {Component} from 'react'
import {Table, BettingKey, CardZone, Card, Controls, Button, Bet, PayTable, KeyValue, PayRow, Text, Suit} from '../styled'
import SocketIO from 'socket.io-client'

//'http://dev-casino.gamesmart.com'
export default class VideoPoker extends Component {

  state = {
    cards: [],
    bet: 1,
    discard: Array(5).fill(true),
    payTable: [],
    maxBet: 3,
    gameOver: false
  }

  constructor(props) {
    super(props)
    this.io = SocketIO('http://localhost:3000')
    this.io.on('connected', console.log('connected'))
    this.io.on('payTable', payTableObject => {
      let payTable = []
      // eslint-disable-next-line
      for (let hand in payTableObject) {
        payTable.push({[hand]: payTableObject[hand]})
      }
      this.setState({payTable})
    })
    this.io.on('openingHand', openingHand => {
      this.setState({
        cards: openingHand,
        gameOver: false
      })
    })
    this.io.on('result', object => {
      console.log('win?', object.result.winningVideoPokerHand)
      this.setState({
        cards: object.playerHand,
        winningHand: object.result.winningVideoPokerHand,
        gameOver: true
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
        bet
      }
    })
  }

  betMax = () => {
    let {maxBet} = this.state
    this.setState({bet: maxBet})
  }

  play = () => {
    let {bet} = this.state
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
    this.io.emit('swap', discard)
  }


  get cardList () {
    let {cards, discard} = this.state
    return cards.map((card, index)=>(
      <Card
        key={card.cid}
        index={index}
        onClick={()=>this.hold(index)}
        discard={(discard[index])}
      >
        <Text>{card.text}</Text>
        <Suit
          suit={card.suit}
        >
          {card.unicode}
        </Suit>
      </Card>
    ))
  }

  get payTables () {
    let {payTable, maxBet, bet} = this.state
    let payTables = []
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
              >
                <KeyValue>
                  {key}
                </KeyValue>
                <KeyValue>
                  {payout[key] * multiplier}
                </KeyValue>
              </PayRow>
            )
          })}
        </PayTable>
      )
    }
    return payTables
  }

  render() {
    let {bet, cards, gameOver} = this.state
    let {betOne, play, cardList, swap, payTables, betMax} = this
    return (
      <Table>
        <BettingKey>
            {payTables}
        </BettingKey>
        <CardZone>
          {cardList}
        </CardZone>
        <Controls>
          <Button
            onClick={betOne}
          >
            Bet 1
          </Button>
          <Button
            onClick={betMax}
          >
            Bet Max
          </Button>
          <Bet>
            {bet}
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
