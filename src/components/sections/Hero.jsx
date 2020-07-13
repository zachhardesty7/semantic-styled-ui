import React, { useEffect, useState } from "react"
import { Container, Segment, Transition } from "semantic-ui-react"
import styled, { css } from "styled-components"

import { defaultColors } from "../../utils"
import { HeroTitle } from "../HeroTitle"
import { HeroSubtitle } from "../HeroSubtitle"
import { HeroLogo } from "../HeroLogo"
import { HeroButton } from "../HeroButton"

const sizes = {
  small: {
    relaxed: "8em",
    base: "6em",
    compact: "4em",
  },
  large: {
    relaxed: "24em",
    base: "16em",
    compact: "8em",
  },
}

const S = {}

S.Segment = styled(Segment)`
  padding-top: ${({ baseline, $size }) =>
    baseline === "top" ? sizes.small[$size] : sizes.large[$size]};
  padding-bottom: ${({ baseline, $size }) =>
    baseline === "top" ? sizes.large[$size] : sizes.small[$size]};

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

S.Chunk = styled.header`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  margin-left: 1rem;
  margin-right: 1rem;

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
  underline = false,
  size = "base",
  inlineLogo = false,
  secondary = false,
  color = "",
  images = [],
  children = null,
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
      {images.map((Background, i) => (
        <Transition
          key={Background.props.alt}
          visible={i === curBackground}
          animation="fade"
          duration={3000}
        >
          <S.BackgroundImage as={Background.type} {...Background.props} />
        </Transition>
      ))}

      <Container>
        {/* nested inline chunk to facilitate underline */}
        <S.Chunk $underline={underline}>{children}</S.Chunk>
      </Container>
    </S.Segment>
  )
}

Hero.Button = HeroButton
Hero.Title = HeroTitle
Hero.Subtitle = HeroSubtitle
Hero.Button = HeroButton
Hero.Logo = HeroLogo
