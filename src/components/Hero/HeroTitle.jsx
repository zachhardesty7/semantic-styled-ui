import React from "react"
import PropTypes from "prop-types"
import { Header } from "semantic-ui-react"
import styled from "styled-components"
import { getColor, margin } from "../../utils"

const S = {} // styled-components namespace

S.Title = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
  ${({ $inlineLogo }) => $inlineLogo && "display: inline-block"};
  ${({ $inlineLogo }) => $inlineLogo && margin("bottom")("0")};
  font-size: ${({ $secondary }) => ($secondary ? "1.95em" : "2.4em")};
`

const HeroTitle = ({
  inlineLogo = "big",
  color = "",
  secondary = "",
  children,
  ...rest
}) => (
  <S.Title
    forwardedAs={secondary ? "h2" : "h1"}
    $color={color}
    $secondary={secondary}
    $inlineLogo={inlineLogo}
    {...rest}
  >
    {children}
  </S.Title>
)

HeroTitle.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * text-based content
   */
  children: PropTypes.node,
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color: PropTypes.string,
  /**
   * format logo left of content
   */
  inlineLogo: PropTypes.string,
  /**
   * de-emphasize the title content
   */
  secondary: PropTypes.string,
}

export { HeroTitle }
