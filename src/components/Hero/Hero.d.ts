import * as React from "react"
import { HeroTitleProps } from "./HeroTitle"
import { HeroSubtitleProps } from "./HeroSubtitle"
import { HeroLogoProps } from "./HeroLogo"
import { HeroButtonProps } from "./HeroButton"

export type HeroOverlay = "dark" | "darker"

export type HeroBaseline = "top" | "center" | "bottom"

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
  images?: JSX.Element[]
  /**
   * primary content rendered on top of the hero
   */
  children?: React.ReactNode
}

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces-with-classes-functions-and-enums
declare const Hero: React.FC<HeroProps> & {
  Title: React.FC<HeroTitleProps>
  Subtitle: React.FC<HeroSubtitleProps>
  Button: React.FC<HeroButtonProps>
  Logo: React.FC<HeroLogoProps>
}
