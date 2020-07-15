import React from "react"
import styled from "styled-components"
import { justifyMap } from "../utils"

const S = {} // styled-components namespace

S.Flexbox = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => justifyMap[$justify]};
`

export const Flexbox = ({ justify, children, ...rest }) => (
  <S.Flexbox $justify={justify} {...rest}>
    {children}
  </S.Flexbox>
)
