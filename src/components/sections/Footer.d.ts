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
   * attach footer to bottom of page when little content
   */
  sticky?: boolean
  /**
   * date & company that holds copyright
   */
  copyright?: string
}

export function Footer(props: FooterProps): JSX.Element
