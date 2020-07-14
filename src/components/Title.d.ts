import * as React from "react"

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

export function Title(props: TitleProps): JSX.Element
