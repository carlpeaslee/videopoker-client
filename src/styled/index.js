import styled from 'styled-components'
import media from './media'

export const Main = styled.div`
  height: 100%;
  width: 100%;
  margin: 100px auto;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Table = styled(Column)`
  background-color: lightgreen;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`

export const BettingKey = styled(Row)`
  background-color: yellow;
  width: 80%;
  min-height: 200px;
`

export const CardZone = styled(Row)`
  background-color: blue;
  width: 80%;
  min-height: 200px;
  justify-content: space-around;
  align-items: center;
`

export const Card = styled(Column)`
  background-color: white;
  width: 150px;
  height: 210px;
  margin: 10px;
  ${media.xs`
    width: 40px;
    height: 56px;
  `}
  ${media.s`
    width: 80px;
    height: 112px;
  `}
  ${media.m`
    width: 150px;
    height: 210px;
  `}
  ${media.l`
    width: 200px;
    height: 280px;
  `}
`
export const Controls = styled(Row)`
  width: 80%;
  justify-content: center;
  background-color: salmon;
  min-height: 150px;
`

export const Button = styled.button`
  min-height: 150px;
  width: 20%;
`

export const Bet = styled(Column)`
  align-items: center;
  justify-content: center;
  width: 20%;
`
