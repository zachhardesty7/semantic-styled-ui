import * as React from "react"

import { FooterContentProps } from "./FooterContent"

export interface FooterProps {
  /**
   * apply css supported color string to content, overrides theme / default
   */
  color?: string
  /**
   * apply css supported color string to background, overrides theme / default
   */
  backgroundColor?: string
  /**
   * allow footer to stretch to edges
   */
  fullWidth?: boolean
  /**
   * set color to secondary, colorHover to primary
   */
  inverted?: boolean
  /**
   * attach footer to bottom of page when little content
   */
  sticky?: boolean
  /**
   * primary content rendered inside the footer
   *
   * **NOTE: only supports 2 or less children**
   */
  children?: React.ReactNode
}

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
declare const Footer: React.FC<FooterProps> & {
  Content: React.FC<FooterContentProps>
}
