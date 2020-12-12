import * as React from "react"

export interface HeroSubtitleProps {
  /**
   * what the main content is rendered as
   */
  as?: React.ElementType
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color?: string
  /**
   * format logo left of content
   */
  inlineLogo?: React.ReactNode
  /**
   * text-based content
   */
  children?: React.ReactNode
}

declare const HeroSubtitle: React.FC<HeroSubtitleProps>
