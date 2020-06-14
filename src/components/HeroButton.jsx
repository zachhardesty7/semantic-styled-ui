import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'

import { Icon } from './Icon'
import { Link } from './Link'

import {
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
} from '../utils'

const S = {} // styled-components namespace

S.Button = styled(Button)`
  display: inline-flex;
  ${getColor('white')};
  ${getBackgroundColor('secondary')};
  transition: ease-in-out 50ms;

  ${getHoverBackgroundColor('primary')};
  &:hover {
    transition: ease-in-out 100ms;
  }
`

S.Icon = styled(Icon)`
  ${getColor('white')};
  ${({ $pointing }) => `margin-${$pointing}: .75em`};
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

export const HeroButton = ({
  as = 'a',
  link = '',
  pointing = 'right',
  compact = false,
  size = 'big',
  color = '',
  colorHover = '',
  children,
  ...rest
}) => (
  <Link
    as={as}
    forwarded
    link={link}
    {...rest}
  >
    <S.Button
      primary
      size={size}
      compact={compact}
      $backgroundColor={color}
      $backgroundColorHover={colorHover}
    >
      {pointing === 'left' && (
        <S.Icon $pointing={pointing} name='angle left' />
      )}
      {children}
      {(pointing === 'right') && (
        <S.Icon $pointing={pointing} name='angle right' />
      )}
    </S.Button>
  </Link>
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
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /** anchor link (prefixed with "#") or standard href */
  link: PropTypes.string,

  /** formatted with active page indicator */
  pointing: PropTypes.oneOf(['left', 'right']),

  /** reduce padding whitespace */
  compact: PropTypes.bool,

  /** size passed to SUI button */
  size: PropTypes.oneOf([]),

  /**
   * apply css supported color string to background, overrides theme / default
   *
   * text defaults to `white` and background to `secondary` theme settings
   */
  color: PropTypes.string,

  /**
   * apply css supported color string to background on hover, overrides theme / default
   *
   * defaults to `primary` theme setting
   */
  colorHover: PropTypes.string,

  /** text-based content */
  children: PropTypes.node,
}
