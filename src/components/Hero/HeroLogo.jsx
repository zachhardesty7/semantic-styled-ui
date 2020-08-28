import React from "react"

export const HeroLogo = ({ children, ...rest }) => (
  <img as={children.type} {...children.props} {...rest} alt="logo" />
)
