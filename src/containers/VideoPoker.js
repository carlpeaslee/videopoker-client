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
  }

  componentDidMount () {
    let width = this.canvas.parentElement.clientWidth
    let height = this.canvas.parentElement.clientHeight
    this.setState( (prevState, props) => {
      return {
        width,
        height
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.draw()
  }

  draw = () => {
    let {width} = this.state
    let c = this.canvas.getContext('2d')
    c.fillStyle = 'green'
    let cardWidth = width / 8
    let cardHeight = cardWidth * 1.4
    let cardX = []
    for (let i = 0; i < 5; i++) {
      cardX.push( (((2*i) + 1)/12) * width)
    }
    for (let i = 0; i < cardX.length; i++) {
      c.fillRect(cardX[i],10,cardWidth,cardHeight)

    }
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
