import React, { useEffect, useState } from "react"
import { Container, Segment, Transition } from "semantic-ui-react"
import styled, { css } from "styled-components"

import {
  defaultColors,
  flexAlignMap,
  getBackgroundColor,
  margin,
  padding,
  textAlignMap,
} from "../../utils"

import { HeroTitle } from "./HeroTitle"
import { HeroSubtitle } from "./HeroSubtitle"
import { HeroLogo } from "./HeroLogo"
import { HeroButton } from "./HeroButton"

const sizes = {
  small: {
    relaxed: "8em",
    base: "6em",
    compact: "4em",
  },
  medium: {
    relaxed: "16em",
    base: "10em",
    compact: "6em",
  },
  large: {
    relaxed: "24em",
    base: "16em",
    compact: "8em",
  },
}

const S = {}

S.Segment = styled(Segment)`
  padding-top: ${({ baseline, $size }) => {
    if (baseline === "top") return sizes.small[$size]
    if (baseline === "center") return sizes.medium[$size]
    return sizes.large[$size]
  }};
  padding-bottom: ${({ baseline, $size }) => {
    if (baseline === "top") return sizes.large[$size]
    if (baseline === "center") return sizes.medium[$size]
    return sizes.small[$size]
  }};

  /* background overlay to dim and saturate */
  &::before {
    content: "";
    height: 100%;
    width: 100.5%;
    background: ${({ overlay }) =>
      (overlay === "dark" &&
        "linear-gradient(0deg,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))") ||
      (overlay === "darker" &&
        "linear-gradient(0deg,rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65))")};
    filter: saturate(2) sepia(0.4);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center + 45%;
    top: 0;
    left: -0.5%;
    position: absolute;
    z-index: 2;
  }
`

S.Container = styled(Container)`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
`

const getBackgroundColorOpacity = (...args) => {
  const out = getBackgroundColor("secondary")(...args)
  out.backgroundColor += "80"
  return out
}

S.Chunk = styled.header`
  align-items: ${({ $textAlign }) => flexAlignMap[$textAlign]};
  text-align: ${({ $textAlign }) => textAlignMap[$textAlign]};
  display: flex;
  flex-direction: column;
  max-width: ${({ $boxed }) => ($boxed ? "45em" : undefined)};

  ${({ $boxed }) => $boxed && getBackgroundColorOpacity};
  ${({ $boxed }) => $boxed && padding("all")("3em")};
  ${({ $boxed }) => $boxed && margin("start")("auto")};
  ${({ $boxed }) => $boxed && margin("end")("5em")};

  border-bottom: ${({ $underline, theme }) =>
    ($underline === true &&
      css`5px solid ${theme.accent || defaultColors.accent}`) ||
    ($underline &&
      css`5px solid ${$underline || theme.accent || defaultColors.accent}`) ||
    "none"};
  z-index: 3;
  position: relative;
`

/* use "!important" to override Gatsby-Image inline style */
S.BackgroundImage = styled.img`
  position: absolute !important;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: 1;
  img:last-child {
    object-fit: cover !important;
    object-position: 45% 55% !important;
  }
`

export const Hero = ({
  overlay = "dark",
  baseline = "bottom",
  justify = "start",
  textAlign = "start",
  underline = false,
  size = "base",
  inlineLogo = false,
  boxed = false,
  color = "",
  images = [],
  children,
  ...rest
}) => {
  const [curBackground, setCurBackground] = useState(0)

  useEffect(() => {
    const cycle = setTimeout(() => {
      setCurBackground((curBackground + 1) % images.length)
    }, 6000)

    return () => clearTimeout(cycle)
  })

  return (
    <S.Segment
      vertical
      baseline={baseline}
      $size={size}
      overlay={overlay}
      {...rest}
    >
      {React.Children.map(images, (Background, i) => (
        <Transition
          key={Background.props.alt}
          visible={i === curBackground}
          animation="fade"
          duration={3000}
        >
          <S.BackgroundImage as={Background.type} {...Background.props} />
        </Transition>
      ))}

      {boxed ? (
        <S.Chunk $boxed={boxed} $textAlign={textAlign} $underline={underline}>
          {children}
        </S.Chunk>
      ) : (
        <S.Container $justify={justify}>
          {/* nested inline chunk to facilitate underline */}
          <S.Chunk $boxed={boxed} $textAlign={textAlign} $underline={underline}>
            {children}
          </S.Chunk>
        </S.Container>
      )}
    </S.Segment>
  )
}

Hero.Button = HeroButton
Hero.Title = HeroTitle
Hero.Subtitle = HeroSubtitle
Hero.Logo = HeroLogo
