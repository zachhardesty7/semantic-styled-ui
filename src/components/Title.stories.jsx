import * as React from "react"
import { Title } from "./Title"

export default {
  title: "Title",
  component: Title,
}

export const Main = (...args) => <Title {...args}>I am a Title</Title>
