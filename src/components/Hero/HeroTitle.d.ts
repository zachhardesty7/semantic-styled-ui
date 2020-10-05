import * as React from "react"

export interface HeroTitleProps {
  /**
   * de-emphasize the title content
   */
  secondary?: boolean
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color?: string
  /**
   * format logo left of content
   */
  inlineLogo?: string
  /**
   * text-based content
   */
  children?: React.ReactNode
}

declare const HeroTitle: React.FC<HeroTitleProps>
