import * as React from "react"

export type TitleTextAlign = "left" | "center" | "right" | "justify"

export type TitleTextAlignSub = "left" | "center" | "right" | "justify"

export type TitlePadded = boolean | "top" | "bottom" | "both"

export interface TitleProps {
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
  textAlign?: TitleTextAlign
  /**
   * format body / subtitle content
   */
  textAlignSub?: TitleTextAlignSub
  /**
   * if/where spacing around element exists
   */
  padded?: TitlePadded
}

export function Title(props: TitleProps): JSX.Element
