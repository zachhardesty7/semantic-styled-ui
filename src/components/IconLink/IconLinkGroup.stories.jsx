import * as React from "react"
import { IconLinkGroup } from "./IconLinkGroup"
import { IconLink } from "./IconLink"

export default {
  title: "IconLinkGroup",
  component: IconLinkGroup,
}

export const Main = (...args) => (
  <IconLinkGroup size="big" color="navy" colorHover="blue" link="#" {...args}>
    <IconLink name="facebook" label="facebook" />
    <IconLink name="twitter" label="twitter" />
    <IconLink name="tumblr" label="tumblr" />
  </IconLinkGroup>
)
