import React from "react"
import styled from "styled-components"

const S = {} // styled-components namespace

S.Logo = styled.img`
  /*   margin-right: 1em; */
`

export const HeroLogo = ({ children, ...rest }) => (
  <S.Logo as={children.type} {...children.props} {...rest} alt="logo" />
)
