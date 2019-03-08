import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Icon } from 'semantic-ui-react'

import { defaultColors, withoutProps } from '../utils'

const FilteredIcon = withoutProps(Icon, ['color', 'hoverColor'])
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

  ${({ link }) => link && css`
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
  `}
`
/* eslint-enable indent */

const SSUIIcon = ({
  name,
  link,
  size,
  inverted,
  color,
  hoverColor,
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
        hoverColor={hoverColor}
      />
    </a>
  ) : (
    <ColoredIcon
      name={name}
      size={size}
      inverted={inverted}
      color={color}
      hoverColor={hoverColor}
      className={className}
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
  inverted: PropTypes.bool,
  className: PropTypes.string
}

SSUIIcon.defaultProps = {
  link: false,
  size: 'large',
  color: '',
  hoverColor: '',
  inverted: false,
  className: ''
}

export default React.memo(SSUIIcon)
