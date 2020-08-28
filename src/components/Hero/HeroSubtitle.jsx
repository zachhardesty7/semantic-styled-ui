import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Header } from "semantic-ui-react"
import { getColor, margin } from "../../utils"

const S = {} // styled-components namespace

S.BaseHeader = styled(Header)`
  ${getColor("white")};
  font-display: fallback;
  font-weight: normal;
`

S.Subtitle = styled(S.BaseHeader)`
  ${({ $inlineLogo }) => $inlineLogo && margin("top")("0.75em")};
  font-size: 1.4em;
`

const HeroSubtitle = ({ as = "h2", color, inlineLogo, children, ...rest }) => (
  <S.Subtitle
    forwardedAs={as}
    $color={color}
    $inlineLogo={inlineLogo}
    {...rest}
  >
    {children}
  </S.Subtitle>
)

HeroSubtitle.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them, edit the d.ts file and run any "yarn build"    |
  // ----------------------------------------------------------------------
  /**
   * what the main content is rendered as
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      childContextTypes: PropTypes.object,
      contextType: PropTypes.shape({
        Consumer: PropTypes.func.isRequired,
        displayName: PropTypes.string,
        Provider: PropTypes.func.isRequired,
      }),
      contextTypes: PropTypes.object,
      defaultProps: PropTypes.object,
      displayName: PropTypes.string,
      getDerivedStateFromError: PropTypes.func,
      getDerivedStateFromProps: PropTypes.func,
      propTypes: PropTypes.object,
    }),
  ]),
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
  inlineLogo: PropTypes.node,
}

export { HeroSubtitle }
