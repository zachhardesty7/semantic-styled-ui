import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import {
  Segment,
  Container,
  Menu
} from 'semantic-ui-react'

import NavigationItem from './NavigationItem'
import NavigationLogo from './NavigationLogo'
import { media } from '../utils'

const NavSegment = styled.header`
  ${({ pointing }) => pointing && 'padding-bottom: 0px'};
`

const NavMenu = styled.nav`
  /* margin-bottom: 1em; */ /* REVIEW: */
  flex-wrap: wrap;
  justify-content: center;

  ${({ pointing }) => pointing && css`
    margin-bottom: 2px; /* for bottom border */

    /* apply border to individual items instead of menu con */
    border-bottom: none !important;

    /* TODO: move to NavItem */
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
  `}

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
  text,
  compact,
  secondary,
  pointing,
  centered,
  className,
  children
}) => (
  <Segment
    as={NavSegment}
    pointing={pointing}
    basic
    vertical
    className={className}
  >
    <Container textAlign={centered ? 'center' : undefined}>
      <Menu
        as={NavMenu}
        size={size}
        text={text}
        compact={compact}
        secondary={secondary}
        pointing={pointing}
      >
        {/* update tag of all children */}
        {React.Children.map(children, Child => React.cloneElement(Child, { tag }))}
      </Menu>
    </Container>
  </Segment>
)

Navigation.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
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
  size: 'large',
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
