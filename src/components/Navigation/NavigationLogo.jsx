import React from "react"
import styled, { css } from "styled-components"

import { NavigationItem } from "./NavigationItem"

import { logoSizes, logoSizesSVG, media } from "../../utils"

const S = {} // styled-components namespace

// css functions not necessary but add syntax highlighting
// if stacked, set stacked logo spacing & remove underline
S.Wrapper = styled.div`
  align-self: center;

  ${({ $stacked }) =>
    $stacked &&
    css`
      margin-right: 50%;
      margin-left: 50%;

      & > .item {
        border-bottom: none;
      }
    `};
`

// use "!important" to override Gatsby-Image inline style
S.Logo = styled.div`
  padding: 0 0.5em;
  height: 100% !important;
  width: 100% !important;

  /* reset weird behavior in gatsby */
  /* will work with regular img child or gatsby-image picture element */
  img:last-child {
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
  }
`

export const NavigationLogo = ({
  as = "a",
  link = "/",
  stacked = false,
  logoSize = "base",
  className = "",
  children,
  ...rest
}) => (
  <S.Wrapper $stacked={stacked} className={className}>
    <NavigationItem
      as={as}
      link={link}
      stacked={stacked}
      pointing={false}
      {...rest}
    >
      <S.Logo as={children.type} {...children.props} $logoSize={logoSize} />
    </NavigationItem>
  </S.Wrapper>
)
