import React from "react"
import styled from "styled-components"

import { flexAlignMap, margin, spacingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

S.Group = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};

  ${margin("horizontal")(spacingMap.tight)};
  /* TODO: add option to say (internal) where 1st nd last have no padding/margin */

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${({ $padded, $padding }) =>
    ($padded === "top" && `padding-top: ${spacingMap[$padding]}`) ||
    ($padded === "bottom" && `padding-bottom: ${spacingMap[$padding]}`) ||
    ($padded && `padding: ${spacingMap[$padding]} 0`)};
`

S.IconLinkItem = styled.div`
  display: flex;
  margin: 0;
  padding: 0 ${spacingMap.compact};

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
  <S.Group
    $justify={justify}
    $padded={padded}
    $padding={padding}
    className={className}
  >
    {React.Children.map(children, (Child) => (
      <S.IconLinkItem>{withNewProps(Child, rest)}</S.IconLinkItem>
    ))}
  </S.Group>
)
