import React from 'react'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

import { paddingMap } from '../utils'

const S = {} // styled-components namespace

S.Header = styled(Header)`
  ${({ $padded }) => (
    ($padded === 'top' && `padding-top: ${paddingMap.base}`) ||
    ($padded === 'bottom' && `padding-bottom: ${paddingMap.base}`) ||
    ($padded && `padding: ${paddingMap.base} 0`)
  )};
`

S.Title = styled.div`
  font-size: 3rem;
  text-align: ${({ $textAlign }) => $textAlign};
`

S.Subtitle = styled(Header.Subheader)`
  font-size: 1.25rem;
  text-align: ${({ $textAlign }) => $textAlign};
`

// TODO: test mobile, may need `container` on `Grid`
export const Title = ({
  as = 'h2',
  subtitle = null,
  textAlign = 'center',
  textAlignSub = 'left',
  padded = false,
  children,
  ...rest
}) => (children || subtitle) && (
  <S.Header $padded={padded} text {...rest}>
    {children && (
      <S.Title as={as} $textAlign={textAlign}>{children}</S.Title>
    )}
    {subtitle && (
      <S.Subtitle $textAlign={textAlignSub}>{subtitle}</S.Subtitle>
    )}
  </S.Header>
)
