const theme = {
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

// add aliases
export default {
  ...theme,
  primary: theme.blue,
  secondary: theme.white,
  accent: theme.red
}
