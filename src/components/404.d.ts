import * as React from "react"

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

export function Section404(props: Section404Props): JSX.Element
