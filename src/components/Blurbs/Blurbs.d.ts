import * as React from "react"
import { TextAlignProp, PaddedVerticalProp } from "../../types"

import { BlurbProps } from "./Blurb"

export type BlurbsFullWidth = boolean | "gutter"

export type BlurbsPadding = "compact" | "tight" | "base" | "relaxed" | "loose"

export interface BlurbsProps {
  /**
   * header
   */
  title?: React.ReactNode
  /**
   * body content proceeding blurbs
   */
  content?: React.ReactNode
  /**
   * do not restrict width of blurbs container
   */
  fullWidth?: BlurbsFullWidth
  /**
   * center title and justify body content
   */
  centered?: TextAlignProp
  /**
   * apply css supported color string to all children, overrides theme / default
   */
  color?: string
  /**
   * format to appear less prominent (grey background)
   */
  secondary?: boolean
  /**
   * if/where spacing around element exists
   */
  padded?: PaddedVerticalProp
  /**
   * control amount of spacing around element
   */
  padding?: BlurbsPadding
  /**
   * primary content of Blurbs.Item
   */
  children?: React.ReactNode
}

declare const Blurbs: React.FC<BlurbsProps> & {
  Item: React.FC<BlurbProps>
}

export type test = {
  none: "0"
  fitted: "0.25em"
  compact: "0.5em"
  tight: "1em"
  base: "2em"
  relaxed: "4em"
  loose: "6em"
}
