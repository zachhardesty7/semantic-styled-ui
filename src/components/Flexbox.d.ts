import * as React from "react"

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

declare function Flexbox(props: FlexboxProps): JSX.Element
