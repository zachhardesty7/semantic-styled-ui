import * as React from "react"
import { PaddedVerticalProp, SpacingProp } from "../types"

export interface PageSegmentProps {
  /**
   * format to appear less prominent (grey background)
   */
  secondary?: boolean
  /**
   * if/where spacing around element exists
   */
  padded?: PaddedVerticalProp
  /**
   * control amount of spacing around element
   */
  padding?: SpacingProp
  /**
   * primary content
   */
  children?: React.ReactNode
}

declare const PageSegment: React.FC<PageSegmentProps>
