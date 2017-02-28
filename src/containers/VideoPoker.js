import React, {Component} from 'react'
import SocketIO from 'socket.io-client'

export default class VideoPoker extends Component {

  state = {
    width: 0,
    height: 0
  }

  constructor(props) {
    super(props)
    this.io = SocketIO('http://localhost:5000')
    this.io.on('connected', console.log('connected'))

    this.heart = '\u2665'
    this.diamond = '\u2666'
    this.spade = '\u2660'
    this.club = '\u2663'
  }

  componentDidMount () {
    let width = this.canvas.parentElement.clientWidth
    let height = this.canvas.parentElement.clientHeight
    let cardZoneWidth = width * .8
    let cardZoneX = width * .1
    let cardWidth = cardZoneWidth / 5.4
    let cardHeight = cardWidth * 1.4
    let cardXMargin = cardWidth * .1
    let cardXArray = []
    for (let i = 0; i < 5; i++) {
      cardXArray.push(cardZoneX + ((cardWidth + cardXMargin) * i))
    }
    let betOneButton = [cardZoneX, (height - (cardHeight + 20)), cardWidth, (cardHeight / 3)]
    let betMaxButton = [(cardZoneX + cardWidth + cardXMargin), (height - (cardHeight + 20)), cardWidth, (cardHeight / 3)]
    let dealDrawButton = [(width - (cardZoneX + cardWidth)), (height - (cardHeight + 20)), cardWidth, (cardHeight / 3)]

    this.setState( (prevState, props) => {
      return {
        width,
        height,
        cardZoneX,
        cardWidth,
        cardHeight,
        cardXMargin,
        cardXArray,
        betOneButton,
        betMaxButton,
        dealDrawButton
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.draw()
  }

  draw = () => {
    let {cardXArray, cardWidth, cardHeight, betOneButton, betMaxButton, dealDrawButton} = this.state
    let c = this.canvas.getContext('2d')
    for (let i = 0; i < cardXArray.length; i++) {
      c.strokeStyle = 'black'
      c.strokeRect(cardXArray[i],10,cardWidth,cardHeight)
      c.textAlign = 'left'
      c.fillStyle = 'black'
      c.font = '30px sans-serif'
      c.fillText(`${i}`, (cardXArray[i] + 5), 40)
      c.fillStyle = 'red'
      c.textAlign = 'right'
      c.fillText(this.diamond, (cardXArray[i] + cardWidth), 85)
    }

    c.fillStyle = 'lightgreen'
    c.fillRect(...betOneButton)
    c.fillRect(...betMaxButton)
    c.fillRect(...dealDrawButton)

  }

  newGame = () => {
    this.io.emit('newGame', {bet: 5000})
  }
  render() {
    let {height, width} = this.state
    return (
      <canvas
        ref={(canvas)=>{
          this.canvas = canvas
        }}
        width={width}
        height={height}
        onClick={(e)=>{
          console.log('clicked')
          console.log(e.target.clientWidth)
          console.log(e.nativeEvent.offsetX)
        }}
      />
    )
  }
}
