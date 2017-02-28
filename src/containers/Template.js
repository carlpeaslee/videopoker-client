import React, {Component} from 'react'
import {Main} from '../styled'

export default class Template extends Component {
  render() {
    return (
      <div>
        <header>
          Casino Time
        </header>
        <Main>
          {this.props.children}
        </Main>
      </div>
    )
  }
}
