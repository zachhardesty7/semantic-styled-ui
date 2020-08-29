import * as React from "react"
import { FooterContent } from "./FooterContent"

export default {
  title: "FooterContent",
  component: FooterContent,
}

export const Main = (...args) => (
  <FooterContent {...args}>I am a FooterContent</FooterContent>
)
