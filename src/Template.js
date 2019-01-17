import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'

import { Navigation, Footer } from './components'
import theme from './theme'

import logo from '../static/gulf-corp-navy.png'

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    font-size: 1em;
    line-height: 1.65;
    color: ${theme.dark};
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    font-size: 2em;
    font-weight: normal;
  }

  a {
    color: ${theme.secondary};
    &:hover {
      color: ${theme.white};
    }
  }
`

const Template = ({ children }) => (
  <div className='root'>
    <GlobalStyle />
    <Navigation
      logo={logo}
      stackedLogo
      largeLogo
      logoAlt='logo'
      anchor={false}
      centered
      pages={['About', 'Portfolio', 'Contact']}
    />
    {children}
    <Footer
      inverted
      copyright='Gulf Corporation, a Mississippi Company'
      stacked
      developerName='Zach Hardesty'
      developerLink='https://zachhardesty.com'
    />
  </div>
)

Template.propTypes = {
  children: PropTypes.element
}

Template.defaultProps = {
  children: null
}

export default Template
