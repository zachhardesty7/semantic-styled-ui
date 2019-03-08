import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Icon } from 'semantic-ui-react'

import { defaultColors, withoutProps } from '../utils'

const iconMap = {
  mini: '0.4em',
  tiny: '0.5em',
  small: '0.75em',
  medium: '1em',
  large: '1.5em',
  big: '2em',
  bigger: '3em',
  huge: '4em',
  massive: '8em'
}

const FilteredIcon = withoutProps(Icon, ['color', 'colorHover', 'size'])
const ColoredIcon = styled(FilteredIcon)`
  font-size: ${({ size }) => iconMap[size]};
  padding: ${({ group }) => (group ? '0 0.5em' : '0')};
  margin: 0;

  color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.secondary || defaultColors.secondary
        : theme.primary || defaultColors.primary
    )
  )};

  ${({ link }) => link && css`
    &:hover {
      color: ${({ colorHover, inverted, theme }) => (
    /* eslint-disable indent */
        colorHover || (
          inverted
            ? theme.white || defaultColors.white
            : theme.secondary || defaultColors.secondary
        )
      )};
    }
  `}
`
/* eslint-enable indent */

const SSUIIcon = ({
  name,
  link,
  size,
  inverted,
  color,
  colorHover,
  className
}) => (
  link ? (
    <a
      href={link === true ? '#' : link}
      rel='noopener noreferrer'
      target={link === true ? null : '_blank'}
      className={className}
    >
      <ColoredIcon
        name={name}
        link
        size={size}
        inverted={inverted}
        color={color}
        colorHover={colorHover}
      />
    </a>
  ) : (
    <ColoredIcon
      name={name}
      size={size}
      inverted={inverted}
      color={color}
      colorHover={colorHover}
      className={className}
    />
  ))

SSUIIcon.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'bigger', 'huge', 'massive']),
  color: PropTypes.string,
  colorHover: PropTypes.string,
  inverted: PropTypes.bool,
  className: PropTypes.string
}

SSUIIcon.defaultProps = {
  link: false,
  size: 'medium',
  color: '',
  colorHover: '',
  inverted: false,
  className: ''
}

export default React.memo(SSUIIcon)
