import * as React from "react"
import { NavigationLogo } from "./NavigationLogo"

export default {
  title: "NavigationLogo",
  component: NavigationLogo,
}

export const Main = (...args) => (
  <NavigationLogo {...args}>I am a NavigationLogo</NavigationLogo>
)
