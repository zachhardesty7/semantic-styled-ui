import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Segment,
  Container,
  Menu
} from 'semantic-ui-react'

import NavigationItem from './NavigationItem'
import { media, calcDuration } from '../utils'

const logoSizes = {
  small: 90,
  base: 155,
  large: 215
}

const NavSegment = styled(Segment)`
  padding-bottom: 0px;
`

const FilteredNavMenu = ({ logoSize, children, ...rest }) => <Menu {...rest}>{children}</Menu>
const NavMenu = styled(FilteredNavMenu)`
  /* margin-bottom: 1em; */ /* REVIEW: */
  margin-bottom: 2px; /* when center aligned */
  flex-wrap: wrap;
  justify-content: center;

  /* apply border to individual items instead of menu con */
  border-bottom: none !important;
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

  ${media.phone`
    a {
      font-size: 0.97rem;
    }
  `}

  /* set stacked logo spacing & remove underline */
  .logo-item-stacked.logo-item-stacked {
    border-bottom: none;
    margin-right: 50%;
    margin-left: 50%;
  }
`

const Logo = styled.div`
  margin: 0 0.5em;
  height: 100% !important;
  width: 100% !important;

  /* reset weird behavior in gatsby */
  /* will work with regular img child or gatsby-image picture element */
  img:last-child {
    position: relative !important;
    width: ${({ logoSize }) => `${logoSizes[logoSize]}px`} !important;

    ${media.phone`
      width: ${({ logoSize }) => `${logoSizes[logoSize] * 0.8}px`} !important;
    `}
  }
`

// TODO: add sticky header
// TEST: various interactions of props
const Navigation = ({
  children,
  as,
  logo,
  logoSize,
  logoAlt,
  stacked,
  anchor,
  size,
  centered
}) => (
  <NavSegment basic vertical>
    <Container textAlign={centered ? 'center' : undefined}>
      <NavMenu size={size} compact secondary pointing>
        {logo && (
          <Menu.Item
            as={as}
            to='/'
            spy={anchor || undefined}
            smooth={anchor || undefined}
            duration={anchor ? calcDuration : undefined}
            tabIndex='0'
            name='home'
            className={stacked ? 'logo-item-stacked' : undefined}
            activeClassName={!stacked ? 'active' : undefined}
          >
            <Logo as={logo.type} {...logo.props} logoSize={logoSize} />
          </Menu.Item>
        )}

        {children}
      </NavMenu>
    </Container>
  </NavSegment>
)

Navigation.propTypes = {
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  logo: PropTypes.node,
  logoAlt: PropTypes.string,
  stacked: PropTypes.bool,
  logoSize: PropTypes.string,
  anchor: PropTypes.bool,
  size: PropTypes.string,
  centered: PropTypes.bool,
  children: PropTypes.node
}

Navigation.defaultProps = {
  as: 'img',
  logo: null,
  logoAlt: '',
  stacked: false,
  logoSize: 'base',
  anchor: false,
  size: 'large',
  centered: false,
  children: []
}

const NavigationMemo = React.memo(Navigation)
NavigationMemo.Item = NavigationItem

export default NavigationMemo
