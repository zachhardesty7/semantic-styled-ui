import * as React from "react"
import { JustifyProp } from "../types"

export interface FlexboxProps {
  /**
   * position / justification of all content
   */
  justify?: JustifyProp
  /**
   * primary content rendered inside the Flexbox
   */
  children?: React.ReactNode
}

declare const Flexbox: React.FC<FlexboxProps>
