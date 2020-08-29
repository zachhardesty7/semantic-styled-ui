import * as React from "react"
import { HeroLogo } from "./HeroLogo"

export default {
  title: "HeroLogo",
  component: HeroLogo,
}

export const Main = (...args) => <HeroLogo {...args}>I am a HeroLogo</HeroLogo>
