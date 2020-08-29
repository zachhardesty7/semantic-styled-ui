import * as React from "react"
import { HeroTitle } from "./HeroTitle"

export default {
  title: "HeroTitle",
  component: HeroTitle,
}

export const Main = (...args) => (
  <HeroTitle {...args}>I am a HeroTitle</HeroTitle>
)
