import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

import NavigationItem from './NavigationItem'

import { media } from '../utils'

const logoSizes = {
  small: 90,
  base: 155,
  large: 215
}

const LogoCon = styled.div`
  align-self: center;
  
  /* set stacked logo spacing & remove underline */
  ${({ stacked }) => stacked && css`
    margin-right: 50%;
    margin-left: 50%;

    > .item {
      border-bottom: none;
    }
  `}
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

const NavigationLogo = ({
  name,
  tag,
  to,
  anchor,
  stacked,
  logoSize,
  className,
  children
}) => (
  <LogoCon stacked={stacked} className={className}>
    <NavigationItem
      name={name}
      tag={tag}
      to={to}
      anchor={anchor}
      stacked={stacked}
    >
      <Logo as={children.type} {...children.props} logoSize={logoSize} />
    </NavigationItem>
  </LogoCon>
)

NavigationLogo.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  to: PropTypes.string,
  anchor: PropTypes.bool,
  stacked: PropTypes.bool,
  logoSize: PropTypes.oneOf(['small', 'base', 'large']),
  className: PropTypes.string,
  children: PropTypes.element.isRequired
}

NavigationLogo.defaultProps = {
  name: 'home',
  tag: 'a',
  to: '/',
  anchor: false,
  stacked: false,
  logoSize: 'base',
  className: ''
}

export default React.memo(NavigationLogo)
