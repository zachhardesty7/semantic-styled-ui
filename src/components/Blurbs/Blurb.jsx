import React from "react"
import styled from "styled-components"

import { Header } from "semantic-ui-react"

import { getColor, spacingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

S.Section = styled.section`
  text-align: ${({ $align }) => $align};
  padding-bottom: ${spacingMap.tight};
`

S.Header = styled(Header)`
  z-index: 10;
  position: relative;
  color: ${({ $color }) => $color};
  font-size: 2em;
`

S.Content = styled(Header.Content)`
  z-index: 10;
  text-align: ${({ $centered }) => $centered && "justify"};
  position: relative;
`

S.BackgroundImage = styled.img`
  position: absolute !important;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: 3;
  img:last-child {
    object-fit: cover !important;
    object-position: 45% 55% !important;
  }
`

S.Icon = styled.span`
  ${getColor("primary")};
`

export const Blurb = ({
  as = "h4",
  icon,
  backgroundImage,
  align = "center",
  header,
  color = "",
  children,
  ...rest
}) => (
  <S.Section $align={align} {...rest}>
    {backgroundImage && (
      <S.BackgroundImage as={backgroundImage.type} {...backgroundImage.props}>
        {backgroundImage.children}
      </S.BackgroundImage>
    )}

    <S.Icon>{withNewProps(icon, { align })}</S.Icon>
    <S.Header forwardedAs={as} $color={color}>
      {header}
    </S.Header>
    <S.Content $centered={align}>{children}</S.Content>
  </S.Section>
)
