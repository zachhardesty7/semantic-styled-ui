import { IconGroup } from "./IconGroup"

export type IconLabel = string | boolean

export type IconSize =
  | "mini"
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "big"
  | "bigger"
  | "huge"
  | "massive"

export interface IconProps {
  /**
   * icon name as supported by Font Awesome 5.0.8
   *
   * @see - [Icon Name Reference Sheet](https://react.semantic-ui.com/elements/icon/)
   */
  name: string
  /**
   * display a text string with the icon
   */
  label?: IconLabel
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
  as?: AsProp
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
  size?: IconSize
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
}

interface IconComponent extends React.FC<IconProps> {
  Group: typeof IconGroup
}

export const Icon: IconComponent

// export function Icon(props: IconProps): JSX.Element

// // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
// export namespace Icon {
//   export const Group: typeof IconGroup
// }
