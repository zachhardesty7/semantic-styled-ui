import * as React from "react"
import { HeroSubtitle } from "./HeroSubtitle"

export default {
  title: "HeroSubtitle",
  component: HeroSubtitle,
}

export const Main = (...args) => (
  <HeroSubtitle {...args}>I am a HeroSubtitle</HeroSubtitle>
)
