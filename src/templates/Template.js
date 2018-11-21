import React from 'react'
import PropTypes from 'prop-types'

import { Navigation } from '../components'

const Template = ({ children }) => (
  <React.Fragment>
    <Navigation
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
