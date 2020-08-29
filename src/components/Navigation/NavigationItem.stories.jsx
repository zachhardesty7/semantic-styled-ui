import * as React from "react"
import { NavigationItem } from "./NavigationItem"

export default {
  title: "NavigationItem",
  component: NavigationItem,
}

export const Main = (...args) => (
  <NavigationItem {...args}>I am a NavigationItem</NavigationItem>
)
