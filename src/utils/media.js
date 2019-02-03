import { css } from 'styled-components'

const media = {
  phone: (...args) => css`
    @media only screen and (max-width: 425px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media only screen and (min-width: 426px) and (max-width: 767px) {
      ${css(...args)}
    }
  `,
  mobile: (...args) => css`
    @media only screen and (max-width: 767px) {
      ${css(...args)}
    }
  `,
  laptop: (...args) => css`
    @media only screen and (min-width: 768px) and (max-width:991px) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media only screen and (min-width: 992px) and (max-width:1199px) {
      ${css(...args)}
    }
  `,
  widescreen: (...args) => css`
    @media only screen and (min-width: 1200px) {
      ${css(...args)}
    }
  `
}

export default media
