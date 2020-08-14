import React from "react"
import { Header } from "semantic-ui-react"
import styled from "styled-components"

import { getColor, media } from "../../utils"

const S = {} // styled-components namespace

S.BaseHeader = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
`

S.Title = styled(S.BaseHeader)`
  ${({ $inlineLogo }) => $inlineLogo && "display: inline-block"};
  ${({ $inlineLogo }) => $inlineLogo && "margin-bottom: 0"};
  /*   padding-right: 0.15em; */
  font-size: ${({ $secondary }) => ($secondary ? "2.25em" : "3em")};

  @media ${media.laptop} {
    /*     font-size: 4em; */
  }
  @media ${media.tablet} {
    /*     font-size: 3.8em; */
  }
  @media ${media.phone} {
    font-size: 12vw;
    width: fit-content;
  }
`

export const HeroTitle = ({
  inlineLogo = "big",
  color = "",
  secondary = "",
  children,
  ...rest
}) => (
  <S.Title
    forwardedAs={secondary ? "h2" : "h1"}
    $color={color}
    $secondary={secondary}
    $inlineLogo={inlineLogo}
    {...rest}
  >
    {children}
  </S.Title>
)
