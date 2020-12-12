import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { NavigationItem } from "./NavigationItem"

import { logoSizes, logoSizesSVG, margin, media } from "../../utils"

const S = {} // styled-components namespace

// css functions not necessary but add syntax highlighting
// if stacked, set stacked logo spacing & remove underline
S.Wrapper = styled.div`
  align-self: center;

  ${({ $stacked }) =>
    $stacked &&
    css`
      ${margin("horizontal")("50%")};

      & > .item {
        border-bottom: none;
      }
    `};
`

// use "!important" to override Gatsby-Image inline style
S.Logo = styled.div`
  position: relative !important;
  height: 3em !important;
  width: auto !important;
  /* height: 100% !important;
  width: 100% !important; */

  /* FIXME: does not work with Gatsby probably */
  /* reset weird behavior in gatsby */
  /* will work with regular img child or gatsby-image picture element */
  /* img:last-child {
    position: relative !important;
    width: ${({ $logoSize }) => logoSizes[$logoSize]}px !important;

    @media ${media.phone} {
      width: ${({ $logoSize }) => logoSizes[$logoSize] * 0.8}px !important;
    }
  }

  svg {
    padding: 0.6em;
    vertical-align: middle;
    width: ${({ logoSize }) => logoSizesSVG[logoSize]}em;

    @media ${media.phone} {
      width: ${({ logoSize }) => logoSizesSVG[logoSize] * 0.8}em;
    }
  } */
`

const NavigationLogo = ({
  as = "a",
  link = "/",
  stacked = false,
  logoSize = "base",
  className = "",
  children,
  ...rest
}) => (
  <S.Wrapper $stacked={stacked} className={className}>
    <NavigationItem as={as} link={link} stacked={stacked} {...rest}>
      <S.Logo as={children.type} {...children.props} $logoSize={logoSize} />
    </NavigationItem>
  </S.Wrapper>
)

NavigationLogo.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.elementType,
  /**
   * primary content, usually a string
   */
  children: PropTypes.node,
  /**
   * additional or pass thru classes for composition
   */
  className: PropTypes.string,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.string,
  /**
   * simple em based size
   */
  logoSize: PropTypes.oneOf(["base", "large", "small"]),
  /**
   * required to support stacking logo
   */
  stacked: PropTypes.bool,
}

export { NavigationLogo }
