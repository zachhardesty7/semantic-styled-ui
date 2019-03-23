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

/* if stacked, set stacked logo spacing & remove underline */
const LogoCon = styled.div`
  align-self: center;
  
  ${({ stacked }) => stacked && css`
    margin-right: 50%;
    margin-left: 50%;

    & > .item {
      border-bottom: none;
    }
  `};
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
    `};
  }
`

const NavigationLogo = ({
  name,
  tag,
  link,
  stacked,
  logoSize,
  className,
  children,
  ...rest
}) => (
  <LogoCon stacked={stacked} className={className}>
    <NavigationItem
      name={name}
      tag={tag}
      link={link}
      stacked={stacked}
      pointing={false}
      {...rest}
    >
      <Logo as={children.type} {...children.props} logoSize={logoSize} />
    </NavigationItem>
  </LogoCon>
)

NavigationLogo.propTypes = {
  /** provide name reference to linked page */
  name: PropTypes.string,

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

  /** required to support stacking logo */
  stacked: PropTypes.bool,

  /** simple em based size */
  logoSize: PropTypes.oneOf(['small', 'base', 'large']),

  /** additional or pass thru classes for composition */
  className: PropTypes.string,

  /** primary content, usually string, used as link if link not provided */
  children: PropTypes.element.isRequired
}

NavigationLogo.defaultProps = {
  name: 'home',
  tag: 'a',
  link: '',
  stacked: false,
  logoSize: 'base',
  className: ''
}

export default React.memo(NavigationLogo)
