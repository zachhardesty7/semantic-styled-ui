import * as React from "react"
import { SpacingProp } from "../types"

export interface FlexboxProps {
  /**
   * position / justification of all content
   */
  justify?: SpacingProp
  /**
   * position / justification of all content
   */
  align?: SpacingProp
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
