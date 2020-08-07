import * as styled from "styled-components"
import * as React from "react"

export type AsProp = JSX.IntrinsicElements | React.ComponentType<Any>
export type Any = any // eslint-disable-line @typescript-eslint/no-explicit-any

export type BoxAlignProp = "start" | "center" | "end" | "justify" | "initial"
export type FlexAlignProp = BoxAlignProp
export type JustifyProp = BoxAlignProp
export type TextAlignProp = BoxAlignProp
export type PaddedVerticalProp = boolean | "top" | "bottom" | "both"

export type SpacingSides =
  | "left"
  | "start"
  | "right"
  | "end"
  | "top"
  | "bottom"
  | "horizontal"
  | "vertical"
  | "all"

/** HTMLElement that casts HTML node attributes into HTMLElement */
export interface HTMLNode extends HTMLElement {
  children: HTMLCollectionOf<HTMLNode>
  parentNode: HTMLNode
}

/** property name of an object backup theme or any of defaultColors */
// export type DefaultColor = keyof typeof import("./utils/colors").defaultColors

export type FlattenSimpleInterpolation = styled.FlattenSimpleInterpolation

/** define styled components supported theme props */
export interface DefaultTheme {
  white: string
  primary: string
  secondary: string
  accent: string
}

// JSDoc helpers
export type Merge<T1, T2> = Omit<T2, keyof T1> & T1

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type Intersect<T1, T2> = T1 & T2
