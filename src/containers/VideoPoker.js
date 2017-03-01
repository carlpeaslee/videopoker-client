import React, {Component} from 'react'
import {Table, BettingKey, CardZone, Card, Controls, Button, Bet} from '../styled'
import SocketIO from 'socket.io-client'

//'http://dev-casino.gamesmart.com'
export default class VideoPoker extends Component {

  state = {
    cards: [],
    bet: 1,
    discard: Array(5).fill(true)
  }

  constructor(props) {
    super(props)
    this.io = SocketIO('http://localhost:3000')
    this.io.on('connected', console.log('connected'))
    this.io.on('openingHand', openingHand => {
      console.log('openingHand', openingHand)
      this.setState({cards: openingHand})
    })
    this.io.on('newCards', newCards => {
      console.log('newCards', newCards)
      this.setState({cards: newCards})
    })
  }

  betOne = () => {
    console.log('hello')
    this.setState( (prevState, props)=> {
      let bet = prevState.bet + 1
      if (bet > 5) {
        bet = 1
      }
      return {
        bet
      }
    })
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
      >
        <span>{card.rank}</span>
        <span>{card.suit}</span>
        <h2>{(discard[index]) ? "DISCARD" : "HOLD"}</h2>
      </Card>
    ))
  }

  render() {
    let {bet, cards} = this.state
    let {betOne, play, cardList, swap} = this
    return (
      <Table>
        <BettingKey>
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
          <Button>
            Bet Max
          </Button>
          <Bet>
            {bet}
          </Bet>
          <Button
            onClick={(cards.length < 1) ? play : swap}
          >
            {(cards.length < 1) ? "Deal" : "Swap"}
          </Button>
        </Controls>
      </Table>
    )
  }
}
