import * as React from "react"
import { AsProp } from "../types"

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
  as?: AsProp
  /**
   * hash link (prefixed with "#") or internal link applied via a new `to` field or can
   * be used as a standard href if `external` tag is set
   */
  link?: string
  /**
   * applies props directly to newly created & rendered `as` component
   */
  wrap?: boolean
  /**
   * when not wrapping, convert `as` tag to `forwardedAs` for passing the prop thru a
   * `styled-components`
   */
  forwarded?: boolean
  /**
   * treats as standard href, usually `a` tagged element
   */
  external?: boolean
  /**
   * primary content, usually a string, but handles multiple items
   */
  children: React.ReactNode
}

declare const Link: React.FC<LinkProps>
