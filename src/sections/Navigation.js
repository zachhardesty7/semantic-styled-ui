import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container, Menu, Segment } from 'semantic-ui-react'
import NavigationItem from '../components/NavigationItem'
import NavigationLogo from '../components/NavigationLogo'

import { asTag, withNewProps, withoutProps } from '../utils'

const NavSegmentTagged = asTag(withoutProps(Segment, ['pointing']))
const NavSegment = styled(NavSegmentTagged)`
  ${({ pointing }) => pointing && 'padding-bottom: 0px'};
`

const NavMenuTagged = asTag(Menu)
const NavMenu = styled(NavMenuTagged)`
  flex-wrap: wrap;
  justify-content: center;

  ${({ pointing }) => pointing && 'border-bottom: none !important'};
  ${({ pointing }) => pointing && 'margin-bottom: 2px'};
`

// TODO: add sticky header
const Navigation = ({
  tag,
  size,
  text,
  compact,
  secondary,
  pointing,
  centered,
  className,
  children
}) => (
  <NavSegment
    tag='header'
    pointing={pointing}
    basic
    vertical
    className={className}
  >
    <Container textAlign={centered ? 'center' : undefined}>
      <NavMenu
        tag='nav'
        size={size}
        text={text}
        compact={compact}
        secondary={secondary}
        pointing={pointing}
      >
        {/* apply tag && pointing to all children */}
        {React.Children.map(children, Child => withNewProps(Child, { tag, pointing }))}
      </NavMenu>
    </Container>
  </NavSegment>
)

Navigation.propTypes = {
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

  /** size using "em" units */
  size: PropTypes.oneOf(['small', 'tiny', 'mini', 'large', 'huge', 'massive']),

  /** format to be used with text items */
  text: PropTypes.bool,

  /** reduce whitespace */
  compact: PropTypes.bool,

  /** reduce prominence */
  secondary: PropTypes.bool,

  /** indicate active page */
  pointing: PropTypes.bool,

  /** horizontal position */
  centered: PropTypes.bool,

  /** additional or pass thru classes for composition */
  className: PropTypes.string,

  /** collection of items to render as menu */
  children: PropTypes.node
}

Navigation.defaultProps = {
  tag: 'a',
  size: undefined,
  text: false,
  compact: true,
  secondary: true,
  pointing: true,
  centered: true,
  className: '',
  children: null
}

const NavigationMemo = React.memo(Navigation)
NavigationMemo.Item = NavigationItem
NavigationMemo.Logo = NavigationLogo

export default NavigationMemo
