import * as React from "react"
import { ContactForm } from "./ContactForm"

export default {
  title: "ContactForm",
  component: ContactForm,
}

export const Main = (...args) => (
  <ContactForm
    name="Contact Form"
    fields={["Name", "Email", "Title", "Number"]}
    {...args}
  />
)
export const Main2 = (...args) => (
  <ContactForm
    button="Contact"
    name="Contact Form"
    padded
    padding="loose"
    textArea={false}
    fields={["Name", "Email", "Title", "Number"]}
    {...args}
  />
)
