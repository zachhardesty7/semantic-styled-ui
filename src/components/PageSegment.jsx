import React from "react"
import PropTypes from "prop-types"
import { Container, Segment } from "semantic-ui-react"
import styled from "styled-components"
import { media, padding } from "../utils"

const S = {} // styled-components namespace

S.Segment = styled(Segment)`
  ${padding("vertical")("2em")};

  &:first-child {
    ${padding("top")("2.5em")};
  }

  &:last-child {
    ${padding("bottom")("4em")};
  }
`

S.Container = styled(Container)`
  @media ${media.tablet} {
    &:not(.fluid) {
      max-width: 425px !important;
      padding: 0 1.5em !important;
      margin: 0 auto !important;
    }
  }

  @media ${media.phone} {
    &:not(.fluid) {
      padding: 0 0.5em !important;
    }
  }
`

const PageSegment = ({ secondary = false, text, children, ...rest }) => (
  <S.Segment
    forwardedAs="section"
    vertical
    basic
    secondary={secondary}
    {...rest}
  >
    <S.Container text={text}>{children}</S.Container>
  </S.Segment>
)

PageSegment.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * primary content
   */
  children: PropTypes.node,
  /**
   * format to appear less prominent (grey background)
   */
  secondary: PropTypes.bool,
  /**
   * pass to `Container` component to narrow the width of the segment
   */
  text: PropTypes.bool,
}

export { PageSegment }
