import * as React from "react"
import { Footer } from "./Footer"

export default {
  title: "Footer",
  component: Footer,
}

export const Main = (...args) => <Footer {...args}>I am a Footer</Footer>
