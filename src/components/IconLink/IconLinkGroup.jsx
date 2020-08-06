import React from "react"
import styled from "styled-components"

import { flexAlignMap, paddingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

S.Groups = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};

  ${({ $padded, $padding }) =>
    ($padded === "top" && `padding-top: ${paddingMap[$padding]}`) ||
    ($padded === "bottom" && `padding-bottom: ${paddingMap[$padding]}`) ||
    ($padded && `padding: ${paddingMap[$padding]} 0`)};
`

S.Group = styled.div`
  display: flex;
  margin: 0;
  padding: 0 ${paddingMap.compact};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`

export const IconLinkGroup = ({
  justify = "initial",
  padded = false,
  padding = "tight",
  className = "",
  children,
  ...rest
}) => (
  <S.Groups
    $justify={justify}
    $padded={padded}
    $padding={padding}
    className={className}
  >
    {React.Children.map(children, (Child) => (
      <S.Group>{withNewProps(Child, rest)}</S.Group>
    ))}
  </S.Groups>
)
