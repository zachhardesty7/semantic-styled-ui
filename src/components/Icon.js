import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Icon } from 'semantic-ui-react'
import Link from './Link'

import {
  asTag,
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

const FilteredIcon = asTag(withoutProps(Icon, ['color', 'colorHover', 'size', 'light', 'inverted']))
const ColoredIcon = styled(FilteredIcon)`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        wrap
        tag={tag}
        link={link}
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
          tag={tag}
          name={name.toLowerCase()}
          size={size}
          inverted={inverted}
          light={light}
          color={color}
          colorHover={colorHover}
          className={className}
          {...rest}
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
  /**
   * icon name as supported by Font Awesome 5.0.8
   * @see[Icon Name Reference Sheet](https://react.semantic-ui.com/elements/icon/)
   */
  name: PropTypes.string.isRequired,

  /** display a text string with the icon */
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),

  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   *
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  tag: PropTypes.oneOfType([
    PropTypes.string, PropTypes.elementType
  ]),

  /** anchor link (prefixed with "#") or standard href */
  link: PropTypes.string,

  /** size using "em" units */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'bigger', 'huge', 'massive']),

  /** apply css supported color string to Icon and text, overrides theme / default */
  color: PropTypes.string,

  /** apply css supported color string to Icon and text on hover, overrides theme / default */
  colorHover: PropTypes.string,

  /** set color to grey, colorHover to white */
  light: PropTypes.bool,

  /** set color to secondary, colorHover to primary */
  inverted: PropTypes.bool,

  /** additional or pass thru classes for composition */
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
