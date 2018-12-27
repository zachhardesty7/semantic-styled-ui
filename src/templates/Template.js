import React from 'react'
import PropTypes from 'prop-types'

import { Navigation } from '../components'

import './Template.scss'

import logo from '../../static/gulf-corp-navy.png'

const Template = ({ children }) => (
  <React.Fragment>
    <Navigation
      logo={logo}
      stackedLogo
      logoAlt='logo'
      anchor={false}
      centered
      pages={['About', 'Portfolio', 'Contact']}
    />
    {children}
  </React.Fragment>
)

Template.propTypes = {
  children: PropTypes.element
}

Template.defaultProps = {
  children: null
}

export default Template
