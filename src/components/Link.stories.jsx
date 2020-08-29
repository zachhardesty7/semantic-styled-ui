import * as React from "react"
import { Link } from "./Link"

export default {
  title: "Link",
  component: Link,
}

export const Main = (...args) => <Link {...args}>I am a Link</Link>
