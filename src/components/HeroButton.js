import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'

import Icon from './Icon'

import {
  asTag,
  calcDuration,
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  process,
  withoutProps
} from '../utils'

const FilteredStyledButton = asTag(withoutProps(Button, ['color', 'backgroundColor', 'backgroundColorHover']))
const StyledButton = styled(FilteredStyledButton)`
  ${getColor('white')};
  ${getBackgroundColor('secondary')};
  transition: ease-in-out 50ms;

  ${getHoverBackgroundColor('primary')};
  &:hover {
    transition: ease-in-out 100ms;
  }
`

const HeroIcon = styled(Icon)`
  ${getColor('white')};
  ${({ pointing }) => (pointing === 'left'
    ? 'margin-right: .75em !important'
    : 'margin-left: .75em !important'
  )};
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

const HeroButton = ({
  tag,
  link,
  pointing,
  compact,
  color,
  colorHover,
  className,
  children
}) => (
  <StyledButton
    tag={tag}
    href={(tag === 'a' && link) || undefined}
    to={(tag !== 'a' && link.slice(link.indexOf('#') + 1)) || undefined}
    spy={(tag !== 'a' && link.includes('#')) || undefined}
    smooth={(tag !== 'a' && link.includes('#')) || undefined}
    duration={(tag !== 'a' && link.includes('#')) ? calcDuration : undefined}
    rel={!link.includes('#') ? 'noopener noreferrer' : undefined}
    target={!link.includes('#') ? '_blank' : undefined}
    size='huge'
    tabIndex='0'
    primary
    compact={compact}
    backgroundColor={color}
    backgroundColorHover={colorHover}
    className={className}
  >
    {pointing === 'left' && (
      <HeroIcon pointing={pointing} name='angle left' />
    )}
    {children}
    {pointing && pointing !== 'left' && (
      <HeroIcon pointing={pointing} name='angle right' />
    )}
  </StyledButton>
)

HeroButton.propTypes = {
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
    PropTypes.string,
    PropTypes.elementType
  ]),

  /** anchor link (prefixed with "#") or standard href */
  link: PropTypes.string,

  /** formatted with active indicator */
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right'])
  ]),

  /** reduce whitespace */
  compact: PropTypes.bool,

  /** apply css supported color string to background, overrides theme / default */
  color: PropTypes.string,

  /** apply css supported color string to background on hover, overrides theme / default */
  colorHover: PropTypes.string,

  /** additional or pass thru classes for composition */
  className: PropTypes.string,

  /** text content */
  children: PropTypes.node
}

HeroButton.defaultProps = {
  tag: 'a',
  link: '',
  pointing: 'right',
  compact: false,
  color: '',
  colorHover: '',
  className: '',
  children: null
}

export default React.memo(HeroButton)
