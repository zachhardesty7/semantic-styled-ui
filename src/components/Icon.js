import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

import { defaultColors } from '../utils'

const FilteredIcon = ({
  color, hoverColor, children, ...rest
}) => <Icon {...rest}>{children}</Icon>

const ColoredIcon = styled(FilteredIcon)`
  padding: ${({ group }) => (group ? '0 0.5em' : '0')};

  margin: 0;

  color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.secondary || defaultColors.secondary
        : theme.primary || defaultColors.primary
    )
  )};

  &:hover {
    color: ${({ hoverColor, inverted, theme }) => (
    /* eslint-disable indent */
      hoverColor || (
        inverted
          ? theme.white || defaultColors.white
          : theme.secondary || defaultColors.secondary
      )
    )};
  }
`
/* eslint-enable indent */

const SSUIIcon = ({
  name,
  link,
  size,
  inverted,
  hoverColor,
  color
}) => (
  link ? (
    <a href={link === true ? '#' : link} rel='noopener noreferrer' target={link === true ? null : '_blank'}>
      <ColoredIcon
        name={name}
        link
        size={size}
        inverted={inverted}
        hoverColor={hoverColor}
        color={color}
      />
    </a>
  ) : (
    <ColoredIcon
      name={name}
      size={size}
      inverted={inverted}
      hoverColor={hoverColor}
      color={color}
    />
  ))

SSUIIcon.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']),
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  inverted: PropTypes.bool
}

SSUIIcon.defaultProps = {
  link: false,
  size: 'large',
  color: '',
  hoverColor: '',
  inverted: false
}

export default React.memo(SSUIIcon)
