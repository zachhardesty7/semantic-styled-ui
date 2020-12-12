import * as React from "react"
import { TextAlignProp, JustifyProp } from "../../types"

import { NavigationItemProps } from "./NavigationItem"
import { NavigationLogoProps } from "./NavigationLogo"

export type NavigationSize =
  | "small"
  | "tiny"
  | "mini"
  | "large"
  | "huge"
  | "massive"

export interface NavigationProps {
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
   * size using "em" units
   */
  size?: NavigationSize
  /**
   * format to be used with text items
   */
  text?: boolean
  /**
   * increase whitespace
   */
  relaxed?: boolean
  /**
   * increase prominence
   */
  primary?: boolean
  /**
   * don't indicate active page
   */
  noPointing?: boolean
  /**
   * flip the colors for display on a light colored background
   */
  inverted?: boolean
  /**
   * allow content to reach the edges of the parent
   */
  fullWidth?: boolean
  /**
   * elevate nav to sit on top of underlying container
   */
  floating?: boolean
  /**
   * put all space between children
   *
   * **NOTE:** only works with 2 items
   */
  split?: boolean
  /**
   * horizontal position
   */
  textAlign?: TextAlignProp
  /**
   * horizontal position
   */
  justify?: JustifyProp
  /**
   * collection of items to render as menu
   */
  children?: React.ReactNode
}

declare const Navigation: React.FC<NavigationProps> & {
  Item: React.FC<NavigationItemProps>
  Logo: React.FC<NavigationLogoProps>
}
