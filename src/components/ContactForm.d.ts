import * as React from "react"

export type ContactFormTextArea = string | boolean

export type ContactFormPadded = boolean | "top" | "bottom" | "both"

export type ContactFormPadding =
  | "compact"
  | "tight"
  | "base"
  | "relaxed"
  | "loose"

export interface ContactFormProps {
  /**
   * enhances semantics
   */
  name?: string
  /**
   * labels for fields
   */
  fields?: string[]
  // REVIEW: whether better to pass false option to disable or just use empty string
  /**
   * label or pass false to disable, defaults to "Enter Message Below:"
   */
  textArea?: ContactFormTextArea
  /**
   * button text content
   */
  button?: string
  /**
   * if/where spacing around element exists
   */
  padded?: ContactFormPadded
  /**
   * amount of spacing around element
   */
  padding?: ContactFormPadding
  /**
   * called when form is successfully submitted
   */
  onSubmit?: () => void
  /**
   * additional form fields
   */
  children?: React.ReactNode
}

export function ContactForm(props: ContactFormProps): JSX.Element
