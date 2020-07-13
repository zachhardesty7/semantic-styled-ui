import * as React from "react"

export type HeroOverlay = "dark" | "darker"

export type HeroBaseline = "top" | "bottom"

export type HeroUnderline = string | boolean

export type HeroSize = "compact" | "base" | "relaxed"

export interface HeroProps {
  /**
   * darken background image to improve readability
   */
  overlay?: HeroOverlay
  /**
   * align content to top or bottom
   */
  baseline?: HeroBaseline
  /**
   * apply css supported color string or use default if true
   */
  underline?: HeroUnderline
  /**
   * size using "em" units
   */
  size?: HeroSize
  /**
   * format logo left of content
   */
  inlineLogo?: boolean
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color?: string
  /**
   * background images
   */
  images?: React.ReactNode[]
  /**
   * primary content rendered on top of the hero
   */
  children?: React.ReactNode
}

declare function Hero(props: HeroProps): JSX.Element
