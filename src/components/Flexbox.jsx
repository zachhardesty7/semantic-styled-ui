import React from "react"
import styled from "styled-components"
import { flexAlignMap, withoutProps } from "../utils"

const S = {} // styled-components namespace

S.Flexbox = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
  align-items: ${({ $align }) => flexAlignMap[$align]};
  flex-direction: ${({ $column }) => $column && "column"};
`

S.FlexItem = styled.div`
  display: flex;
`

export const Flexbox = ({ justify, align, column, children, ...rest }) => (
  <S.Flexbox $justify={justify} $align={align} $column={column}>
    {React.Children.map(children, (Child) => (
      <S.FlexItem as={Child.type} {...rest} {...Child.props}>
        {Child.props.children}
      </S.FlexItem>
    ))}
  </S.Flexbox>
)
