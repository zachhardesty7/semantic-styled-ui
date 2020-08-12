import React from "react"
import { Segment } from "semantic-ui-react"
import styled from "styled-components"
import { padding as getPadding, media, spacingMap } from "../utils"

const S = {} // styled-components namespace

/* fix absurdly wide segments on tablet size */
/* use "!important" to override .ui.text.container */
S.Segment = styled(Segment)`
  ${({ $padded, padding }) =>
    ($padded === "top" && `margin-top: ${spacingMap[padding]}`) ||
    ($padded === "bottom" && `margin-bottom: ${spacingMap[padding]}`) ||
    ($padded && `margin: ${spacingMap[padding]} 0`)};

  &:first-child {
    ${getPadding("top")("none")};
  }

  @media ${media.tablet} {
    .container:not(.fluid) {
      max-width: 397px !important;
      /*       padding: 0 1.5em; */
      margin: 0 auto !important;
    }
  }

  @media ${media.phone} {
    .container:not(.fluid) {
      margin: 0 2em !important;
    }
  }
`

export const PageSegment = ({
  secondary = false,
  padded = "both",
  padding = "base",
  children,
  ...rest
}) => (
  <S.Segment
    $padded={padded}
    padding={padding}
    forwardedAs="section"
    vertical
    basic
    secondary={secondary}
    {...rest}
  >
    {children}
  </S.Segment>
)
