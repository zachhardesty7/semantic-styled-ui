import * as React from "react"

export interface FooterContentProps {
  /**
   * format content as stacked
   */
  stacked?: boolean
  /**
   * you!
   */
  developerName?: React.ReactNode
  /**
   * your website or blog or whatever
   */
  developerLink?: string
  /**
   * stylistically format text as lower case
   */
  lowerCased?: boolean
  /**
   * company that holds copyright
   */
  copyright?: string
  /**
   * date the copyright began, displays as year.
   *
   * expands to include range from provided date to current year when they don't match
   */
  date?: Date
}

declare function FooterContent(props: FooterContentProps): JSX.Element
