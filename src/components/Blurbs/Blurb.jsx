import React from "react"
import styled, { css } from "styled-components"

import { Header, Item } from "semantic-ui-react"
import { Flexbox } from "../Flexbox"

import { getColor, margin, media, spacingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

S.Section = styled.section`
  text-align: ${({ $align }) => $align};
  /* padding-bottom: ${spacingMap.tight}; */
`

S.Header = styled(Header)`
  z-index: 10;
  position: relative;
  color: ${({ $color }) => $color};
  @media ${media.mobile} {
    text-align: center;
  }
`

S.Content = styled(Header.Content)`
  z-index: 10;
  text-align: ${({ $centered }) => $centered && "justify"};
  position: relative;

  /* break words at syllable in non-chrome browsers */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    text-align: ${({ $centered }) => $centered && "left"};
  }
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

S.FlexIcon = styled(Flexbox)`
  @media not ${media.mobile} {
    ${margin("end")("base")};
  }

  @media ${media.mobile} {
    ${margin("bottom")("1.5em")};
  }
`

export const Blurb = ({
  as = "h2",
  icon,
  backgroundImage,
  align = "center",
  header,
  color = "",
  vertical = false,
  children,
  ...rest
}) =>
  vertical ? (
    <>
      <Item {...rest}>
        {/* <ProcessDarkenedImage size="medium" rounded>
          <ProcessLabel ribbon size="huge">{`#${i + 1}`}</ProcessLabel>
          {item.image && (
            <GImage
              fixed={item.image.fixed}
              $backgroundColor
              alt={item.image.title}
            />
          )}
        </ProcessDarkenedImage> */}

        <S.FlexIcon align="center" justify="center">
          <S.Icon>{withNewProps(icon, { align })}</S.Icon>
        </S.FlexIcon>

        <Flexbox as={Item.Content} column justify="center">
          <S.Header forwardedAs={as}>{header}</S.Header>
          <Item.Description>{children}</Item.Description>
        </Flexbox>
      </Item>
    </>
  ) : (
    <S.Section $align={align} {...rest}>
      {backgroundImage && (
        <S.BackgroundImage as={backgroundImage.type} {...backgroundImage.props}>
          {backgroundImage.children}
        </S.BackgroundImage>
      )}

      {icon && <S.Icon>{withNewProps(icon, { align })}</S.Icon>}
      {header && (
        <S.Header forwardedAs={as} $color={color}>
          {header}
        </S.Header>
      )}
      {children && <S.Content $centered={align}>{children}</S.Content>}
    </S.Section>
  )
