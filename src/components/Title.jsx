import React from "react"
import styled from "styled-components"

import { Header } from "semantic-ui-react"

import { margin, media, padding, spacingMap } from "../utils"

const S = {} // styled-components namespace

S.Header = styled(Header)`
  ${margin("bottom")("1.75em", ["internal"])};
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
export const Title = ({
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
