import * as React from "react"
import { IconLink } from "./IconLink"

export default {
  title: "IconLink",
  component: IconLink,
}

export const Main = (...args) => (
  <IconLink
    color="black"
    name="thumbs up"
    size="bigger"
    align="left"
    {...args}
  />
)

export const Main2 = (...args) => (
  <IconLink
    color="black"
    name="thumbs up"
    size="bigger"
    label="thumbs up"
    colorHover="grey"
    link="#"
    {...args}
  />
)
