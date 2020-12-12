import { JustifyProp } from "../../types"
import { IconLinkGroupProps } from "./IconLinkGroup"

export type IconLinkLabel = string | boolean

export type IconLinkSize =
  | "mini"
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "big"
  | "bigger"
  | "huge"
  | "massive"

export interface IconLinkProps {
  /**
   * icon name as supported by Font Awesome 5.0.8
   *
   * @see - [Icon Name Reference Sheet](https://react.semantic-ui.com/elements/icon/)
   */
  name: string
  /**
   * display a text string with the icon
   */
  label?: IconLinkLabel
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
  as?: React.ElementType
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link?: string | boolean
  /**
   * position / justification of all content
   */
  align?: JustifyProp
  /**
   * size based on "em" units
   */
  size?: IconLinkSize
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color?: string
  /**
   * apply css supported color string to Icon and text on hover, overrides theme / default
   */
  colorHover?: string
  /**
   * set color to grey, colorHover to white
   */
  light?: boolean
  /**
   * set color to secondary, colorHover to primary
   */
  inverted?: boolean
  /**
   * reduce padding
   */
  fitted?: boolean
}

declare const IconLink: React.FC<IconLinkProps> & {
  Group: React.FC<IconLinkGroupProps>
}
