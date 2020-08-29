import * as React from "react"
import { Section404 } from "./Section404"

export default {
  title: "Section404",
  component: Section404,
}

export const Main = (...args) => (
  <Section404 {...args}>I am a Section404</Section404>
)
