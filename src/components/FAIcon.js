import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { utils } from '../utils'

const FAIcon = ({ name, size }) => (
  <Async
    promise={import('@fortawesome/free-solid-svg-icons')}
    then={icon => (
      <FontAwesomeIcon icon={icon[`fa${utils.toJoinedTitleCase(name)}`]} size={size} />
    )}
  />
)

FAIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string
}

FAIcon.defaultProps = {
  name: '',
  size: '3x'
}

export default React.memo(FAIcon)
