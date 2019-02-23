import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

import { defaultColors } from '../utils'

const ColoredIcon = styled(Icon)`
  padding: 0 0.5em;
  margin: 0;

  color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.secondary || defaultColors.secondary
        : theme.primary || defaultColors.primary
    )
  )};

  &:hover {
    color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.white || defaultColors.white
        : theme.secondary || defaultColors.secondary
    )
  )};
  }
`

const SocialMediaIcon = ({
  name,
  link,
  inverted,
  color
}) => (
  <a href={link || '#'} rel='noopener noreferrer' target={link ? '_blank' : null}>
    <ColoredIcon
      link
      color={color}
      inverted={inverted}
      name={name}
      size='large'
    />
  </a>
)

SocialMediaIcon.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  color: PropTypes.string,
  inverted: PropTypes.bool
}

SocialMediaIcon.defaultProps = {
  name: '',
  link: '',
  color: '',
  inverted: false
}

export default React.memo(SocialMediaIcon)
