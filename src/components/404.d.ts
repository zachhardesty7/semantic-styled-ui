import * as React from "react"
import { TextAlignProp } from "../types"

export interface Section404Props {
  /**
   * main message of the error section
   */
  title?: React.ReactNode
  /**
   * subtitle of main message
   */
  content?: React.ReactNode
  /**
   * format body content
   */
  textAlign?: TextAlignProp
}

declare const Section404: React.FC<Section404Props>
