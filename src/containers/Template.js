import React, {Component} from 'react'
import {Main} from '../styled'

export default class Template extends Component {
  render() {
    return (
      <Main>
        {this.props.children}
      </Main>
    )
  }
}
