import * as React from "react"
import { BoxAlignProp, SpacingProp } from "../types"

export interface FlexboxProps {
  /**
   * position / justification of all content
   */
  justify?: BoxAlignProp
  /**
   * position / justification of all content
   */
  align?: BoxAlignProp
  /**
   * direction of flex
   */
  column?: boolean
  /**
   * primary content rendered inside the Flexbox
   */
  children?: React.ReactNode
}

declare const Flexbox: React.FC<FlexboxProps>
