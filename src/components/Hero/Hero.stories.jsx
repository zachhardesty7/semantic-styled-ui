import * as React from "react"
import { Hero } from "./Hero"
import { HeroButton } from "./HeroButton"

export default {
  title: "Hero",
  component: Hero,
}

export const Main = (...args) => (
  <Hero
    size="compact"
    title="Hero Title"
    subtitle="Hero subtitle"
    button={<HeroButton color="navy">Click me!</HeroButton>}
    {...args}
  />
)
