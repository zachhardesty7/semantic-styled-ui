import * as React from "react"
import { AsProp, TextAlignProp, PaddedVerticalProp } from "../types"

interface TitleProps {
  /**
   * main title content
   */
  children?: React.ReactNode
  /**
   * what the main content is rendered as
   */
  as?: AsProp
  /**
   * subtitle content
   */
  subtitle?: React.ReactNode
  /**
   * format title content
   */
  textAlign?: TextAlignProp
  /**
   * format body / subtitle content
   */
  textAlignSub?: TextAlignProp
  /**
   * if/where spacing around element exists
   */
  padded?: PaddedVerticalProp
}

declare const Title: React.FC<TitleProps>
