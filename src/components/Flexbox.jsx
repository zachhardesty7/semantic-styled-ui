import React from "react"
import styled from "styled-components"
import { flexAlignMap } from "../utils"

const S = {} // styled-components namespace

S.Flexbox = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
`

export const Flexbox = ({ justify, children, ...rest }) => (
  <S.Flexbox $justify={justify} {...rest}>
    {children}
  </S.Flexbox>
)
