import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

// user-defined
import './index.scss'

const RootIndex = ({ data }) => (
  <React.Fragment>
    hello world!
  </React.Fragment>
)

RootIndex.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

RootIndex.defaultProps = {
  data: {}
}

export default RootIndex
