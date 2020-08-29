import * as React from "react"
import { HeroButton } from "./HeroButton"

export default {
  title: "HeroButton",
  component: HeroButton,
}

export const Main = (...args) => (
  <HeroButton color="red" colorHover="orange" {...args}>
    Click me!
  </HeroButton>
)
export const Main2 = (...args) => (
  <HeroButton
    color="blue"
    colorHover="magenta"
    compact
    pointing={false}
    {...args}
  >
    Click me!
  </HeroButton>
)
