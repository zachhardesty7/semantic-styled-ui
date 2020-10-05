import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Container, Segment, Transition } from "semantic-ui-react"
import styled, { css } from "styled-components"

import {
  defaultColors,
  flexAlignMap,
  getBackgroundColor,
  margin,
  media,
  padding,
  textAlignMap,
  withTag,
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
    relaxed: "12em",
    base: "9em",
    compact: "6em",
  },

  large: {
    relaxed: "16em",
    base: "12em",
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
        "linear-gradient(0deg,rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65))") ||
      (overlay === "darkest" &&
        "linear-gradient(0deg,rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.75))")};
    filter: saturate(1.8) sepia(0.4);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center + 45%;
    top: 0;
    left: -0.5%;
    position: absolute;
    z-index: 2;
  }

  @media ${media.desktop} {
    font-size: 0.9rem;
  }
  @media ${media.laptop} {
    font-size: 0.8rem;
  }
  @media ${media.tablet} {
    font-size: 0.8rem;
  }
  @media ${media.phone} {
    font-size: 0.8rem;
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
  max-width: ${({ $boxed }) => ($boxed ? "36em" : undefined)};

  ${({ $boxed }) =>
    $boxed &&
    css`
      ${getBackgroundColorOpacity};
      ${padding("all")("2.3em")};
      ${margin("start")("auto")};
      ${margin("end")("4em")};

      @media ${media.laptop} {
        ${margin("end")("3em")};
      }
      @media ${media.mobile} {
        ${margin("horizontal")("2em")};
        max-width: unset;
        align-items: center;
        text-align: center;
      }
      @media ${media.phone} {
        ${padding("all")("1.5em")};
      }
    `};

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

const Hero = ({
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

Hero.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * align content to top or bottom
   */
  baseline: PropTypes.oneOf(["bottom", "center", "top"]),
  /**
   * limit the width of the content and draw border
   */
  boxed: PropTypes.bool,
  /**
   * primary content rendered on top of the hero
   */
  children: PropTypes.node,
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color: PropTypes.string,
  /**
   * background images
   */
  images: PropTypes.arrayOf(PropTypes.element),
  /**
   * format logo left of content
   */
  inlineLogo: PropTypes.bool,
  /**
   * flex alignment of Hero content container
   */
  justify: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
  /**
   * darken background image to improve readability
   */
  overlay: PropTypes.oneOf(["dark", "darker", "darkest"]),
  /**
   * size using "em" units
   */
  size: PropTypes.oneOf(["base", "compact", "relaxed"]),
  /**
   * flex alignment of Hero content container
   */
  textAlign: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
  /**
   * apply css supported color string or use default if true
   */
  underline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export { Hero }

Hero.Button = withTag("SSUI", HeroButton)
Hero.Title = withTag("SSUI", HeroTitle)
Hero.Subtitle = withTag("SSUI", HeroSubtitle)
Hero.Logo = withTag("SSUI", HeroLogo)
