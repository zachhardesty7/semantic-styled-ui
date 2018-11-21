import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

// user-defined
import './index.scss'

import { Hero } from '../components'

import Template from '../templates'

const RootIndex = ({ data }) => (
  <Template>
    <Hero />
    hello world!
  </Template>
)

RootIndex.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

RootIndex.defaultProps = {
  data: {}
}

export default RootIndex
