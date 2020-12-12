import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { Header } from "semantic-ui-react"

import { margin, media, padding, spacingMap } from "../utils"

const S = {} // styled-components namespace

S.Header = styled(Header)`
  ${margin("bottom")("1.25em", ["internal"])};
  ${({ $padded }) =>
    ($padded === "top" && padding("top")(spacingMap.base)) ||
    ($padded === "bottom" && padding("bottom")(spacingMap.base)) ||
    ($padded && padding("vertical")(spacingMap.base))};
`

S.Title = styled.div`
  text-align: ${({ $textAlign }) => $textAlign};
  @media ${media.mobile} {
    text-align: center;
  }
`

S.Subtitle = styled(Header.Subheader)`
  text-align: ${({ $textAlign }) => $textAlign};
`

// TODO: test mobile, may need `container` on `Grid`
const Title = ({
  as = "h1",
  subtitle = null,
  textAlign = "left",
  textAlignSub = "left",
  padded = false,
  children,
  ...rest
}) =>
  (children || subtitle) && (
    <S.Header $padded={padded} {...rest}>
      {children && (
        <S.Title as={as} $textAlign={textAlign}>
          {children}
        </S.Title>
      )}

      {subtitle && (
        <S.Subtitle $textAlign={textAlignSub}>{subtitle}</S.Subtitle>
      )}
    </S.Header>
  )

Title.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * what the main content is rendered as
   */
  as: PropTypes.elementType,
  /**
   * main title content
   */
  children: PropTypes.node,
  /**
   * if/where spacing around element exists
   */
  padded: PropTypes.oneOfType([
    PropTypes.oneOf(["both", "bottom", "top"]),
    PropTypes.bool,
  ]),
  /**
   * subtitle content
   */
  subtitle: PropTypes.node,
  /**
   * format title content
   */
  textAlign: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
  /**
   * format body / subtitle content
   */
  textAlignSub: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
}

export { Title }
