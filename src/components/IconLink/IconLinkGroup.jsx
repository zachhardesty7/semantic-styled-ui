import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
  flexAlignMap,
  padding as getPadding,
  margin,
  spacingMap,
  withNewProps,
} from "../../utils"

const S = {} // styled-components namespace

S.Group = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};

  ${margin("horizontal")(spacingMap.tight)};
  /* TODO: add option to say (internal) where 1st nd last have no padding/margin */

  &:first-child {
    ${margin("left")("0")};
  }

  &:last-child {
    ${margin("right")("0")};
  }

  ${({ $padded, $padding }) =>
    ($padded === "top" && getPadding("top")) ||
    ($padded === "bottom" && getPadding("bottom")) ||
    ($padded && getPadding("vertical"))};
`

S.IconLinkItem = styled.div`
  display: flex;
  ${margin("all")("0")};
  ${getPadding("horizontal")(spacingMap.compact)};

  &:first-child {
    ${getPadding("left")("0")};
  }

  &:last-child {
    ${getPadding("right")("0")};
  }
`

const IconLinkGroup = ({
  justify = "initial",
  padded = false,
  padding = "tight",
  className = "",
  children,
  ...rest
}) => (
  <S.Group
    $justify={justify}
    $padded={padded}
    $padding={padding}
    className={className}
  >
    {React.Children.map(children, (Child) => (
      <S.IconLinkItem>{withNewProps(Child, rest)}</S.IconLinkItem>
    ))}
  </S.Group>
)

IconLinkGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them, edit the d.ts file and run any "yarn build"    |
  // ----------------------------------------------------------------------
  /**
   * primary content of icon(s)
   */
  children: PropTypes.node,
  /**
   * additional or pass thru classes for composition
   */
  className: PropTypes.string,
  /**
   * flex alignment of icon container
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
   * spacing around element exists
   */
  padded: PropTypes.oneOfType([
    PropTypes.oneOf(["both", "bottom", "top"]),
    PropTypes.bool,
  ]),
  /**
   * control amount of spacing around element
   */
  padding: PropTypes.oneOf(["base", "compact", "loose", "relaxed", "tight"]),
}

export { IconLinkGroup }
