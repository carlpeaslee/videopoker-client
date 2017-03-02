import styled from 'styled-components'
import media from './media'

const cardWidths = {
  xs: 40,
  s: 80,
  m: 150,
  l: 200
}

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
  min-height: 100%;
  width: 100%;
`

export const BettingKey = styled(Row)`
  width: 80%;
  justify-content: space-around;
`

export const PayTable = styled(Column)`
  background-color: white;
  flex-wrap: wrap;
  margin: 20px;
  outline: ${({multiplier,bet}) => (multiplier === bet) ? '3px solid pink': 'none'};
  width: 25%;
  padding: 20px;
  box-sizing: border-box;
`

export const PayRow = styled(Row)`
  justify-content: space-between;
`

export const KeyValue = styled.span`
  display: flex;
  font-size: 2em;
`

export const CardZone = styled(Row)`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  height: ${cardWidths.l * 1.4}px;
  ${media.xs`
    height: ${cardWidths.xs * 1.4}px;
  `}
  ${media.s`
    height: ${cardWidths.s * 1.4}px;
  `}
  ${media.m`
    height: ${cardWidths.m * 1.4}px;
  `}
  ${media.l`
    height: ${cardWidths.l * 1.4}px;
  `}
`

export const Card = styled(Column)`
  background-color: white;
  width: ${cardWidths.l}px;
  height: ${cardWidths.l * 1.4}px;
  margin: 0 10px;
  box-shadow: ${({discard}) => (discard) ? "none" : "0 0 20px blue"};
  opacity: ${({discard}) => (discard) ? .8 : 1 };
  &:before {
    position: absolute;
    margin-top: -50px;
    align-self: center;
    font-size: 2em;
    content: "${({discard}) => (discard) ? "swap" : "hold"}";
    color: black;
  }
  ${media.xs`
    width: ${cardWidths.xs}px;
    height: ${cardWidths.xs * 1.4}px;
    border-radius: ${cardWidths.xs / 20}px;
    padding:${cardWidths.xs / 20}px;
  `}
  ${media.s`
    width: ${cardWidths.s}px;
    height: ${cardWidths.s * 1.4}px;
    border-radius: ${cardWidths.s / 20}px;
    padding:${cardWidths.s / 20}px;
  `}
  ${media.m`
    width: ${cardWidths.m}px;
    height: ${cardWidths.m * 1.4}px;
    border-radius: ${cardWidths.m / 20}px;
    padding:${cardWidths.m / 20}px;
  `}
  ${media.l`
    width: ${cardWidths.l}px;
    height: ${cardWidths.l * 1.4}px;
    border-radius: ${cardWidths.l / 20}px;
    padding:${cardWidths.l / 20}px;
  `}
`

export const Text = styled.span`
  font-size: 4em;
`

export const Suit = styled.span`
  font-size: 7em;
  margin: auto 0;
  align-self: center;
  color: ${({suit}) => (suit === 'DIAMONDS' || suit === 'HEARTS') ? 'red' : 'black'};
`

export const Controls = styled(Row)`
  width: 80%;
  justify-content: space-around;
`

export const Button = styled.button`
  width: 20%;
  font-size: 4em;
  background-color: white;
  border-color: lightblue;
  ${media.xs`
    height: ${cardWidths.xs}px;
    border-radius: ${cardWidths.xs / 10}px;
  `}
  ${media.s`
    height: ${cardWidths.s}px;
    border-radius: ${cardWidths.s / 10}px;
  `}
  ${media.m`
    height: ${cardWidths.m}px;
    border-radius: ${cardWidths.m / 10}px;
  `}
  ${media.l`
    height: ${cardWidths.l}px;
    border-radius: ${cardWidths.l / 10}px;
  `}
`

export const Bet = styled(Column)`
  align-items: center;
  justify-content: center;
  width: 20%;
  font-size: 7em;
`
