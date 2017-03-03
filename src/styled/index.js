import styled from 'styled-components'
import media from './media'

const cardWidths = {
  xs: 90,
  s: 130,
  m: 170,
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
  padding: 20px 0;
`

export const BettingKey = styled(Row)`
  width: 80%;
  justify-content: space-around;
  ${media.xs`
    width: 100%;
  `}
  ${media.s`
    width: 90%;
  `}
  ${media.m`
    width: 90%;
  `}
`

export const KeyTable = styled(Column)`
  width: 30%;
  background-color: white;
  padding: 20px;
  opacity: .9;
  ${media.xs`
    width: 60%;
    opacity: 1;
  `}
  ${media.s`
    width: 60%;
    opacity: 1;
  `}
`

export const PayTable = styled(Column)`
  background-color: white;
  box-shadow: ${({multiplier,bet}) => (multiplier === bet) ? '0 0 20px blue': 'none'};
  opacity: ${({multiplier,bet}) => (multiplier === bet) ? 1: .9};
  width: 25%;
  padding: 20px;
  ${media.xs`
    display: ${({multiplier,bet}) => (multiplier === bet) ? '': 'none'};
    width: 40%;
    opacity: 1;
    box-shadow: none;
  `}
  ${media.s`
    display: ${({multiplier,bet}) => (multiplier === bet) ? '': 'none'};
    width: 40%;
    opacity: 1;
    box-shadow: none;
  `}
`

export const KeyRow = styled(Row)`
  justify-content: flex-start;
  font-size: 2em;
  color: ${({currentValue}) => (currentValue) ? 'salmon' : ''};
  ${media.xs`
    font-size: 1em;
  `}
  ${media.s`
    font-size: 1.5em;
  `}
`

export const PayRow = styled(Row)`
  justify-content: flex-end;
  font-size: 2em;
  color: ${({currentValue}) => (currentValue) ? 'salmon' : ''};
  ${media.xs`
    font-size: 1em;
  `}
  ${media.s`
    font-size: 1.5em;
  `}
`

export const CardZone = styled(Row)`
  width: 80%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  height: ${cardWidths.l * 1.4}px;
  margin: auto;
  ${media.xs`
    height: ${cardWidths.xs * 1.4}px;
    width: 98%;
  `}
  ${media.s`
    height: ${cardWidths.s * 1.4}px;
    width: 95%;
  `}
  ${media.m`
    height: ${cardWidths.m * 1.4}px;
  `}
  ${media.l`
    height: ${cardWidths.l * 1.4}px;
  `}
`

const before = ({gameOver,discard}) => {
  if (gameOver) {
    return ""
  } else if (discard) {
    return ""
  } else {
    return "hold"
  }
}

export const Card = styled(Column)`
  background-color: white;
  min-width: ${cardWidths.l}px;
  height: ${cardWidths.l * 1.4}px;
  margin: 0 10px;
  box-shadow: ${({discard}) => (discard) ? "none" : "0 0 20px blue"};
  opacity: ${({discard, gameOver}) => (discard && !gameOver) ? .8 : 1 };
  cursor: ${({gameOver}) => (gameOver) ? "not-allowed" : "pointer"};
  background-image: url("${({cardUrl}) => cardUrl || ''}");
  background-size: cover;
  &:hover {
    box-shadow: ${({gameOver}) => (gameOver) ? "none" : "0 0 20px blue"};
  }
  &:before {
    position: absolute;
    margin-top: -50px;
    align-self: center;
    font-size: 2em;
    content: "${(props) => before(props)}";
    color: black;
    opacity: .7
  }
  &:hover:before {
    opacity: 1;
    content: "${({gameOver, discard}) => (!gameOver && discard) ? "hold?" : '' }";
  }
  ${media.xs`
    min-width: ${cardWidths.xs}px;
    height: ${cardWidths.xs * 1.4}px;
    border-radius: ${cardWidths.xs / 20}px;
    padding:${cardWidths.xs / 20}px;
    margin: 0 3px;
  `}
  ${media.s`
    min-width: ${cardWidths.s}px;
    height: ${cardWidths.s * 1.4}px;
    border-radius: ${cardWidths.s / 20}px;
    padding:${cardWidths.s / 20}px;
    margin: 0 6px;
  `}
  ${media.m`
    min-width: ${cardWidths.m}px;
    height: ${cardWidths.m * 1.4}px;
    border-radius: ${cardWidths.m / 20}px;
    padding:${cardWidths.m / 20}px;
  `}
  ${media.l`
    min-width: ${cardWidths.l}px;
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
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  ${media.xs`
    height: ${cardWidths.xs}px;
    border-radius: ${cardWidths.xs / 10}px;
    font-size: 1em;
  `}
  ${media.s`
    height: ${cardWidths.s}px;
    border-radius: ${cardWidths.s / 10}px;
    font-size: 1.5em;
  `}
  ${media.m`
    height: ${cardWidths.m}px;
    border-radius: ${cardWidths.m / 10}px;
    font-size: 2em;
  `}
  ${media.l`
    height: ${cardWidths.l}px;
    border-radius: ${cardWidths.l / 10}px;
    font-size: 3em;
  `}
`

export const Bet = styled(Column)`
  align-items: center;
  justify-content: center;
  width: 20%;
  font-size: 2em;
  ${media.xs`
    font-size: .8em;
  `}
  ${media.s`
    font-size: 1em;
  `}
`

export const Result = styled(Row)`
  display: flex;
  font-size: 3em;
  height: 3em;
  ${media.xs`
    font-size: 2em;
  `}
  ${media.s`
    font-size: 2em;
  `}
`
