import * as React from "react"

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
  as?: string | JSX.Element

  /** position / justification of all content */
  align?: "start" | "center" | "end"

  /** secondary content of body */
  // children: PropTypes.node,
}

export function Blurb(props: BlurbProps): JSX.Element
