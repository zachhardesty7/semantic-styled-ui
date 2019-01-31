import { css } from 'styled-components'

const colors = {
  blue: '#172749',
  red: '#fe0000',
  grey: '#5b5b5b',

  success: '#28a745',
  info: '#31CCEC',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#d2d7db',
  dark: '#343c42',
  black: '#070707',
  white: '#fff'
}

export const media = {
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

// add aliases
export const theme = {
  ...colors,
  primary: colors.blue,
  secondary: colors.white,
  accent: colors.red
}
