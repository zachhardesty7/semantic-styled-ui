import * as React from 'react'

export type IconGroupJustify = 'flex-start' | 'center' | 'flex-end'

export type IconGroupPadded = boolean | 'top' | 'bottom' | 'both'

export type IconGroupPadding =
  | 'compact'
  | 'tight'
  | 'base'
  | 'relaxed'
  | 'loose'

export interface IconGroupProps {
  /**
   * flex alignment of icon container
   */
  justify?: IconGroupJustify
  /**
   * spacing around element exists
   */
  padded?: IconGroupPadded
  /**
   * control amount of spacing around element
   */
  padding?: IconGroupPadding
  /**
   * additional or pass thru classes for composition
   */
  className?: string
  /**
   * primary content of icon(s)
   */
  children: React.ReactNode
}

export function IconGroup(props: IconGroupProps): JSX.Element
