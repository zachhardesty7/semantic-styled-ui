import * as React from "react"
import { Blurbs } from "./Blurbs"

export default {
  title: "Blurbs",
  component: Blurbs,
}

export const Main = (...args) => <Blurbs {...args}>I am a Blurbs</Blurbs>
