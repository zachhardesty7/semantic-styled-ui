import * as React from "react"

export interface PortfolioItemProps {
  /**
   * primary content
   */
  title?: React.ReactNode
  /**
   * secondary content
   */
  subtitle?: React.ReactNode
  /**
   * determine when to cover the entire space with hidden overflow
   */
  fill?: boolean
  /**
   * image-based content
   */
  children?: React.ReactNode
}

declare const PortfolioItem: React.FC<PortfolioItemProps>
