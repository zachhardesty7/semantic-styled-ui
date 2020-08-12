import React from "react"
import styled from "styled-components"

import { Header } from "semantic-ui-react"

import { margin, spacingMap } from "../utils"

const S = {} // styled-components namespace

S.Header = styled(Header)`
  ${({ $padded }) =>
    ($padded === "top" && `padding-top: ${spacingMap.base}`) ||
    ($padded === "bottom" && `padding-bottom: ${spacingMap.base}`) ||
    ($padded && `padding: ${spacingMap.base} 0`)};
`

S.Title = styled.div`
  /*   font-size: 3rem; */
  text-align: ${({ $textAlign }) => $textAlign};
  ${margin("top")("fitted")};
  ${margin("bottom")("compact")};
`

S.Subtitle = styled(Header.Subheader)`
  /*   font-size: 1.25rem; */
  text-align: ${({ $textAlign }) => $textAlign};
`

// TODO: test mobile, may need `container` on `Grid`
export const Title = ({
  as = "h2",
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
