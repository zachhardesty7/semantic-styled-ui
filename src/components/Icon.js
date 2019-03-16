import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Icon } from 'semantic-ui-react'

import {
  calcDuration,
  defaultColors,
  withoutProps
} from '../utils'

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

const FilteredIcon = withoutProps(Icon, ['color', 'colorHover', 'size', 'light', 'inverted'])
const ColoredIcon = styled(FilteredIcon)`
  font-size: ${({ size }) => iconMap[size]};
  padding: ${({ group }) => (group ? '0 0.5em' : '0')};
  margin: 0;
  opacity: 1;

  color: ${({
    color,
    light,
    inverted,
    theme
  }) => (
    color ||
    (light && (theme.light || defaultColors.light)) ||
    (inverted && (theme.secondary || defaultColors.secondary)) ||
    (theme.primary || defaultColors.primary)
  )};

  ${({ link }) => link && css`
    ${IconContainer}:hover & {
      opacity: 1;
      color: ${({
    /* eslint-disable indent */
        colorHover,
        light,
        inverted,
        theme
      }) => (
        colorHover ||
        (light && (theme.white || defaultColors.white)) ||
        (inverted && (theme.primary || defaultColors.primary)) ||
        (theme.secondary || defaultColors.secondary)
      )};
    }
  `};
`

const ColoredLabel = styled.span`
  color: ${({
      color,
      light,
      inverted,
      theme
    }) => (
      color ||
      (light && (theme.light || defaultColors.light)) ||
      (inverted && (theme.secondary || defaultColors.secondary)) ||
      (theme.primary || defaultColors.primary)
    )};

  ${({ link }) => link && css`
    ${IconContainer}:hover & {
      color: ${({
        colorHover,
        light,
        inverted,
        theme
      }) => (
        colorHover ||
        (light && (theme.white || defaultColors.white)) ||
        (inverted && (theme.primary || defaultColors.primary)) ||
        (theme.secondary || defaultColors.secondary)
      )};
    }
  `};
`

/* eslint-enable indent */

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SSUIIcon = ({
  name,
  label,
  tag,
  link,
  size,
  light,
  inverted,
  color,
  colorHover,
  className,
  ...rest
}) => (
  <IconContainer>
    {link ? (
      <Link
        as={tag}
        href={(tag === 'a' && link) || undefined}
        to={(tag !== 'a' && link.slice(link.indexOf('#') + 1)) || undefined}
        spy={(tag !== 'a' && link.includes('#')) || undefined}
        smooth={(tag !== 'a' && link.includes('#')) || undefined}
        duration={(tag !== 'a' && link.includes('#')) ? calcDuration : undefined}
        {...(tag !== 'a' && !link.includes('#') && { activeClassName: 'active' })}
        rel={!link.includes('#') ? 'noopener noreferrer' : undefined}
        target={!link.includes('#') ? '_blank' : undefined}
        className={className}
        {...rest}
      >
        <ColoredIcon
          name={name.toLowerCase()}
          link
          size={size}
          inverted={inverted}
          light={light}
          color={color}
          colorHover={colorHover}
        />
        {label && (
          <ColoredLabel
            link
            inverted={inverted}
            light={light}
            color={color}
            colorHover={colorHover}
          >
            {label === true ? name : label}
          </ColoredLabel>
        )}
      </Link>
    ) : (
      <>
        <ColoredIcon
          name={name.toLowerCase()}
          size={size}
          inverted={inverted}
          light={light}
          color={color}
          colorHover={colorHover}
          className={className}
        />
        {label && (
          <ColoredLabel
            inverted={inverted}
            light={light}
            color={color}
            colorHover={colorHover}
          >
            {label === true ? name : label}
          </ColoredLabel>
        )}
      </>
    )}
  </IconContainer>
)

SSUIIcon.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  tag: PropTypes.oneOfType([
    PropTypes.string, PropTypes.elementType
  ]),
  link: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'bigger', 'huge', 'massive']),
  color: PropTypes.string,
  colorHover: PropTypes.string,
  light: PropTypes.bool,
  inverted: PropTypes.bool,
  className: PropTypes.string
}

SSUIIcon.defaultProps = {
  label: false,
  tag: 'a',
  link: '',
  size: 'medium',
  color: '',
  colorHover: '',
  light: false,
  inverted: false,
  className: ''
}

export default React.memo(SSUIIcon)
