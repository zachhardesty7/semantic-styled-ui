import * as React from "react"
import { Navigation } from "./Navigation"

export default {
  title: "Navigation",
  component: Navigation,
}

export const Main = (...args) => (
  <Navigation {...args}>I am a Navigation</Navigation>
)
