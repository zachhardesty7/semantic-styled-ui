import * as React from "react"
import { JustifyProp, PaddedVerticalProp } from "../../types"

export type IconLinkGroupPadding =
  | "compact"
  | "tight"
  | "base"
  | "relaxed"
  | "loose"

export interface IconLinkGroupProps {
  /**
   * flex alignment of icon container
   */
  justify?: JustifyProp
  /**
   * spacing around element exists
   */
  padded?: PaddedVerticalProp
  /**
   * control amount of spacing around element
   */
  padding?: IconLinkGroupPadding
  /**
   * additional or pass thru classes for composition
   */
  className?: string
  /**
   * primary content of icon(s)
   */
  children: React.ReactNode
}

// export const IconGroup: React.FC<IconGroupProps>

declare const IconLinkGroup: React.FC<IconLinkGroupProps>
