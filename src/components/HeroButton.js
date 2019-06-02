import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'

import Icon from './Icon'
import Link from './Link'

import {
  asTag,
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  withoutProps
} from '../utils'

const S = {} // styled-components namespace

const FilteredButton = asTag(withoutProps(Button, ['color', 'backgroundColor', 'backgroundColorHover']))
S.Button = styled(FilteredButton)`
  display: inline-flex;
  ${getColor('white')};
  ${getBackgroundColor('secondary')};
  transition: ease-in-out 50ms;

  ${getHoverBackgroundColor('primary')};
  &:hover {
    transition: ease-in-out 100ms;
  }
`

const FilteredIcon = asTag(withoutProps(Icon, ['pointing']))
S.Icon = styled(FilteredIcon)`
  ${getColor('white')};
  ${({ pointing }) => (pointing === 'left'
    ? 'margin-right: .75em'
    : 'margin-left: .75em'
  )};
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

const HeroButton = ({
  tag = 'a',
  link = '',
  pointing = 'right',
  compact = false,
  color = '',
  colorHover = '',
  children,
  ...rest
}) => (
  <Link
    tag={tag}
    link={link}
    {...rest}
  >
    <S.Button
      size='huge'
      primary
      compact={compact}
      backgroundColor={color}
      backgroundColorHover={colorHover}
    >
      {pointing === 'left' && (
        <S.Icon pointing={pointing} name='angle left' />
      )}
      {children}
      {(pointing === 'right' || pointing === true) && (
        <S.Icon pointing={pointing} name='angle right' />
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
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),

  /** anchor link (prefixed with "#") or standard href */
  link: PropTypes.string,

  /** formatted with active indicator */
  pointing: PropTypes.oneOf(['left', 'right', true, false]),

  /** reduce whitespace */
  compact: PropTypes.bool,

  /** apply css supported color string to background, overrides theme / default */
  color: PropTypes.string,

  /** apply css supported color string to background on hover, overrides theme / default */
  colorHover: PropTypes.string,

  /** text content */
  children: PropTypes.node
}

export default React.memo(HeroButton)
