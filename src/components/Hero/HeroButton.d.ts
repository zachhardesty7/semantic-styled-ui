import * as React from "react"

export type HeroButtonPointing = "left" | "right"

export type HeroButtonSize = "left" | "right"

export interface HeroButtonProps {
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
  link?: string
  /**
   * formatted with active page indicator
   */
  pointing?: HeroButtonPointing
  /**
   * reduce padding whitespace
   */
  compact?: boolean
  /**
   * size passed to SUI button
   */
  size?: HeroButtonSize
  /**
   * apply css supported color string to background, overrides theme / default
   * text defaults to `white` and background to `secondary` theme settings
   */
  color?: string
  /**
   * apply css supported color string to background on hover, overrides theme / default
   * defaults to `primary` theme setting
   */
  colorHover?: string
  /**
   * text-based content
   */
  children?: React.ReactNode
}

export function HeroButton(props: HeroButtonProps): JSX.Element
