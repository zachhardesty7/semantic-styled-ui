import * as React from "react"

export interface HeroSubtitleProps {
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

export function HeroSubtitle(props: HeroSubtitleProps): JSX.Element
