import * as React from "react"
import { JustifyProp } from "../../types"

export type BlurbProps = {
  /** content above header */
  icon?: React.ReactNode

  /** element representing image to cover background */
  backgroundImage?: React.ReactNode

  /** primary content (styled as text) */
  header?: React.ReactNode

  /** apply css supported color string to Header text, overrides theme / default */
  color?: string

  /**
   * element type to render `header` as (string or function)
   *
   * supports HTML tag as a string or React component definition
   *
   * @example
   *
   * 'div'
   * 'section'
   * {ReactComponent}
   * Card
   */
  as?: React.ElementType

  /** position / justification of all content */
  align?: JustifyProp

  /** useful for rendering multiple blurbs in a column */
  vertical?: boolean

  /** secondary content of body */
  // children: PropTypes.node,
}

/**
 * information about buttons
 */
declare const Blurb: React.FC<BlurbProps>
