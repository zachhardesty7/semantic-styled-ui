import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { Button } from "semantic-ui-react"

import { IconLink } from "../IconLink"
import { Link } from "../Link"

import {
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  margin,
} from "../../utils"

const S = {} // styled-components namespace

S.Button = styled(Button)`
  display: inline-flex;
  align-items: center;
  line-height: 1.2em;
  ${margin("right")("0")};
  ${getColor("white")};
  ${getBackgroundColor("secondary")};
  transition: ease-in-out 50ms;

  ${margin("top")("0.5em")};

  ${getHoverBackgroundColor("primary")};
  &:hover {
    transition: ease-in-out 100ms;
  }
`

S.IconLink = styled(IconLink)`
  ${getColor("white")};
  ${({ $pointing }) => `margin-${$pointing}: .75em`};
  vertical-align: bottom;
  /*   width: 1em; */
  /*   height: 1em; */
`

const HeroButton = ({
  as = "a",
  link = "",
  pointing = "right",
  compact = false,
  size = "big",
  color = "",
  colorHover = "",
  children,
  ...rest
}) => (
  <Link as={as} forwarded link={link} {...rest}>
    <S.Button
      primary
      size={size}
      compact={compact}
      $backgroundColor={color}
      $backgroundColorHover={colorHover}
    >
      {pointing === "left" && (
        <S.IconLink $pointing="right" name="angle left" />
      )}

      {children}
      {pointing === "right" && (
        <S.IconLink $pointing="left" name="angle right" />
      )}
    </S.Button>
  </Link>
)

HeroButton.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.any,
  /**
   * text-based content
   */
  children: PropTypes.node,
  /**
   * apply css supported color string to background, overrides theme / default
   * text defaults to `white` and background to `secondary` theme settings
   */
  color: PropTypes.string,
  /**
   * apply css supported color string to background on hover, overrides theme / default
   * defaults to `primary` theme setting
   */
  colorHover: PropTypes.string,
  /**
   * reduce padding whitespace
   */
  compact: PropTypes.bool,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.string,
  /**
   * formatted with active page indicator
   */
  pointing: PropTypes.oneOf(["left", "right"]),
  /**
   * size passed to SUI button
   */
  size: PropTypes.oneOf(["left", "right"]),
}

export { HeroButton }
