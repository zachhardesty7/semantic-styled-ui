import React from "react"
import styled from "styled-components"
import { Header } from "semantic-ui-react"
import { getColor, margin } from "../../utils"

const S = {} // styled-components namespace

S.BaseHeader = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
`

S.Subtitle = styled(S.BaseHeader)`
  ${({ $inlineLogo }) => $inlineLogo && margin("top")("0.75em")};
  font-size: 1.4em;
`

export const HeroSubtitle = ({
  as = "h2",
  color,
  inlineLogo,
  children,
  ...rest
}) => (
  <S.Subtitle
    forwardedAs={as}
    $color={color}
    $inlineLogo={inlineLogo}
    {...rest}
  >
    {children}
  </S.Subtitle>
)
