import React from "react"
import styled from "styled-components"
import { flexAlignMap } from "../utils"

const S = {} // styled-components namespace

S.Flexbox = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
  align-items: ${({ $align }) => flexAlignMap[$align]};
  flex-direction: ${({ $column }) => ($column ? "column" : undefined)};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : undefined)};
`

S.FlexItem = styled.div`
  /* display: flex; */
`

export const Flexbox = ({
  justify,
  align,
  column,
  wrap,
  children,
  ...rest
}) => (
  <S.Flexbox
    $wrap={wrap}
    $justify={justify}
    $align={align}
    $column={column}
    {...rest}
  >
    {React.Children.map(children, (Child) => (
      <S.FlexItem $wrap={wrap} as={Child.type} {...Child.props}>
        {Child.props.children}
      </S.FlexItem>
    ))}
  </S.Flexbox>
)
