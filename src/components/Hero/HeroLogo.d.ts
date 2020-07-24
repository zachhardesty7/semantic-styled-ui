import * as React from "react"

export interface HeroLogoProps {
  /**
   * text-based content
   */
  children?: React.ReactNode
}

declare const HeroLogo: React.FC<HeroLogoProps>
