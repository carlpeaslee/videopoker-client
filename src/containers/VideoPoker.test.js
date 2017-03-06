import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import {mount} from 'enzyme'
import VideoPoker from './VideoPoker'
import SocketIO from 'socket.io-client'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<VideoPoker/>, div)
})

test('maxBet correctly sets the maximum bet', () => {
  const vp = mount(<VideoPoker/>)
  const maxBet = vp.state('maxBet')
  vp.find('#maxBet').simulate('click')
  const currentBet = vp.state('bet')
  expect(currentBet).toEqual(maxBet)
})


test('theme information is received', (done) => {
  const vp = mount(<VideoPoker/>)
  vp.node.io.on('theme', (config) => {
    done()
  })
})
