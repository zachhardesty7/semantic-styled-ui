import * as React from "react"

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
   * apply css supported color string to content on hover, overrides theme / default
   */
  colorHover?: string
  /**
   * format content as stacked
   */
  stacked?: boolean
  /**
   * hide icons and split float developer info
   */
  separated?: boolean
  /**
   * allow footer to stretch to edges
   */
  fullWidth?: boolean
  /**
   * you!
   */
  developerName?: string
  /**
   * your website or blog or whatever
   */
  developerLink?: string
  /**
   * collection of Icons to render
   *
   * @see [`Icon`](#icon)
   * @see [`IconGroup`](#icongroup)
   */
  icons?: React.ReactNode
  /**
   * set color to secondary, colorHover to primary
   */
  inverted?: boolean
  /**
   * stylistically format text as lower case
   */
  lowerCased?: boolean
  /**
   * attach footer to bottom of page when little content
   */
  sticky?: boolean
  /**
   * company that holds copyright
   */
  copyright?: string
  /**
   * date the copyright began, displays as year.
   *
   * expands to include range from this to current year when they don't match
   */
  date?: Date
}

export function Footer(props: FooterProps): JSX.Element
