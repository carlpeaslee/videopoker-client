import {css} from 'styled-components'

const media = {
  xs: (...args) => css`
    @media (max-width: 768px) {
      ${ css(...args) }
    }
  `,
  s: (...args) => css`
    @media (min-width: 768px) and (max-width: 992px) {
      ${ css(...args) }
    }
  `,
  m: (...args) => css`
    @media (min-width: 992px) and (max-width: 1200px) {
      ${ css(...args) }
    }
  `,
  l: (...args) => css`
    @media (min-width: 1200px) {
      ${ css(...args) }
    }
  `
}

export default media
