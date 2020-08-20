import React from "react"
import { Header } from "semantic-ui-react"
import styled from "styled-components"
import { getColor } from "../../utils"

const S = {} // styled-components namespace

S.Title = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
  ${({ $inlineLogo }) => $inlineLogo && "display: inline-block"};
  ${({ $inlineLogo }) => $inlineLogo && "margin-bottom: 0"};
  /*   padding-right: 0.15em; */
  font-size: ${({ $secondary }) => ($secondary ? "2.25em" : "3em")};
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
