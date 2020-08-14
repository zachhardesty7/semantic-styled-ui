import React from "react"
import { Container, Segment } from "semantic-ui-react"
import styled from "styled-components"
import { media, padding, spacingMap } from "../utils"

const S = {} // styled-components namespace

S.Segment = styled(Segment)`
  ${padding("vertical")("2em")};

  &:first-child {
    ${padding("top")("2.5em")};
  }

  &:last-child {
    ${padding("bottom")("4em")};
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
  // padding = "base",
  children,
  ...rest
}) => (
  <S.Segment
    // padding={padding}
    forwardedAs="section"
    vertical
    basic
    secondary={secondary}
    {...rest}
  >
    <Container>{children}</Container>
  </S.Segment>
)
