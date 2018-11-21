import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

// user-defined
import './index.scss'

import { Hero } from '../components'
import Template from '../templates'

const portfolio = ({ data }) => (
  <Template>
    <Hero />
    portfolio!
  </Template>
)

portfolio.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

portfolio.defaultProps = {
  data: {}
}

export default portfolio
