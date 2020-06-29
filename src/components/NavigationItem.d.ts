import * as React from 'react'

export interface NavigationItemProps {
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as?: AsProp
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link?: string
  /**
   * formatted with active indicator
   */
  pointing?: boolean
  /**
   * required to support stacking logo
   */
  stacked?: boolean
  /**
   * primary content, usually string, used as link if link not provided
   */
  children: React.ReactNode
}

export function NavigationItem(props: NavigationItemProps): JSX.Element
