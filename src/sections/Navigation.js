import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container, Menu, Segment } from 'semantic-ui-react'
import NavigationItem from '../components/NavigationItem'
import NavigationLogo from '../components/NavigationLogo'

import { applyTag, withNewProps, withoutProps } from '../utils'

const NavSegmentTagged = applyTag(withoutProps(Segment, ['pointing']))
const NavSegment = styled(NavSegmentTagged)`
  ${({ pointing }) => pointing && 'padding-bottom: 0px'};
`

const NavMenuTagged = applyTag(Menu)
const NavMenu = styled(NavMenuTagged)`
  /* margin-bottom: 1em; */ /* REVIEW: */
  flex-wrap: wrap;
  justify-content: center;
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
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),
  size: PropTypes.oneOf(['small', 'tiny', 'mini', 'large', 'huge', 'massive']),
  text: PropTypes.bool,
  compact: PropTypes.bool,
  secondary: PropTypes.bool,
  pointing: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
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
