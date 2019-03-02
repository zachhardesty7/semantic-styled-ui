import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Segment,
  Container,
  Menu
} from 'semantic-ui-react'

import NavigationItem from './NavigationItem'
import NavigationLogo from './NavigationLogo'
import { media } from '../utils'

const NavSegment = styled.header`
  padding-bottom: 0px;
`

const NavMenu = styled.nav`
  /* margin-bottom: 1em; */ /* REVIEW: */
  margin-bottom: 2px; /* when center aligned */
  flex-wrap: wrap;
  justify-content: center;

  /* apply border to individual items instead of menu con */
  border-bottom: none !important;

  /* TODO: move to navitem */
  & > .item.item {
    border-bottom: 2px solid rgba(34,36,38,.15);

    &.active {
      border-bottom: 2px solid #1b1c1d;
    }

    /* remove rounded edge that distorts underline */
    &:last-child {
      border-radius: 0;
    }

    /* mix primary menu w secondary menu style */
    &:hover {
      background-color: rgba(0,0,0,.05);
    }
  }

  & > div {
    /* mix primary menu w secondary menu style */
    &:hover {
      background-color: rgba(0,0,0,.05);
    }
  }

  ${media.phone`
    a {
      font-size: 0.97rem;
    }
  `}
`

// TODO: add sticky header
// TEST: various interactions of props
const Navigation = ({
  tag,
  size,
  compact,
  secondary,
  pointing,
  centered,
  children
}) => (
  <Segment as={NavSegment} basic vertical>
    <Container textAlign={centered ? 'center' : undefined}>
      <Menu
        as={NavMenu}
        size={size}
        compact={compact}
        secondary={secondary}
        pointing={pointing}
      >
        {/* update tag of all children */}
        {React.Children.map(children, child => React.cloneElement(child, { tag }))}
      </Menu>
    </Container>
  </Segment>
)

Navigation.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'tiny', 'mini', 'large', 'huge', 'massive']),
  compact: PropTypes.bool,
  secondary: PropTypes.bool,
  pointing: PropTypes.bool,
  centered: PropTypes.bool,
  children: PropTypes.node
}

Navigation.defaultProps = {
  tag: 'a',
  size: 'large',
  compact: true,
  secondary: true,
  pointing: true,
  centered: true,
  children: null
}

const NavigationMemo = React.memo(Navigation)
NavigationMemo.Item = NavigationItem
NavigationMemo.Logo = NavigationLogo

export default NavigationMemo
