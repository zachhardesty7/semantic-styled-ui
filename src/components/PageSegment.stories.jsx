import * as React from "react"
import { PageSegment } from "./PageSegment"

export default {
  title: "PageSegment",
  component: PageSegment,
}

export const Main = (...args) => (
  <PageSegment {...args}>I am a PageSegment</PageSegment>
)
