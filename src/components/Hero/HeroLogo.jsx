import React from "react"
import PropTypes from "prop-types"

const HeroLogo = ({ children, ...rest }) => (
  <img as={children.type} {...children.props} {...rest} alt="logo" />
)

HeroLogo.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * text-based content
   */
  children: PropTypes.node,
}

export { HeroLogo }
