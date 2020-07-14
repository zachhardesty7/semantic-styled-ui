import React from "react"
import styled from "styled-components"
import { Header } from "semantic-ui-react"
import { getColor } from "../../utils/styled"
import { media } from "../../utils/media"

const S = {} // styled-components namespace

S.BaseHeader = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
`

S.Subtitle = styled(S.BaseHeader)`
  ${({ $inlineLogo }) => $inlineLogo && "margin-top: 0.75em"};
  font-size: 1.7rem;

  @media ${media.laptop} {
    font-size: 1.45em;
  }
  @media ${media.tablet} {
    font-size: 1.4em;
  }
  @media ${media.phone} {
    width: min-content;
    min-width: 11em;
    font-size: 1.4em;
  }
`

export const HeroSubtitle = ({ color, inlineLogo, children, ...rest }) => (
  <S.Subtitle
    forwardedAs="h2"
    $color={color}
    $inlineLogo={inlineLogo}
    {...rest}
  >
    {children}
  </S.Subtitle>
)
