import * as React from "react"

export interface LinkProps {
  /**
   * element type to render as (string or function) supports HTML tag as a string or
   * React component definition
   * NOTE: ignored if `link` contains a "#"
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as?: React.ElementType
  /**
   * hash link (prefixed with "#") or internal link applied via a new `to` field or can
   * be used as a standard href if a full link is provided
   *
   * @example
   * internal: "/blog/contact"
   * anchor: "#contact-section"
   * external: "https://example.com"
   */
  link?: string
  /**
   * creates a new element of the type of `as` tag and applies props newly created tag
   */
  wrap?: boolean
  /**
   * when not wrapping, will convert `as` tag to `forwardedAs` for passing the prop thru a
   * `styled-components`
   */
  forwarded?: boolean
  /**
   * primary content, usually a string, but handles multiple items by linking each of them
   */
  children: React.ReactNode
}

/**
 * helper that should generally be used to wrap a component to add link support
 * supports internal links with `as` tag link handler like `gatsby-link`, external
 * links, and anchor links
 */
declare const Link: React.FC<LinkProps>
