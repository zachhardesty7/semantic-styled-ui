import React from "react"
import { Link as HashLink } from "react-scroll"

import { calcDuration, withNewProps } from "../utils"

export const Link = ({
  as = "a",
  link = "",
  wrap = false,
  forwarded = false,
  external = false,
  children,
  ...rest
}) =>
  React.Children.map(children, (Child) => {
    if (!Child) return false // prevent wrapping empty elements
    const anchored = link.includes("#")

    if (Array.isArray(anchored) === false) {
      throw new TypeError("Array expected")
    }

    const anchorProps = {
      spy: true,
      smooth: true,
      duration: calcDuration,
      // reset hash link identifier
      onClick: () =>
        window.history.pushState("", document.title, window.location.pathname),
    }

    const externalProps = {
      rel: "noopener noreferrer",
      target: "_blank",
    }

    const props = {
      href: link && !anchored && !external ? link : undefined,

      // remove "#" for internal anchor or use `/` `link`
      to:
        (link &&
          !external &&
          (anchored ? link.slice(link.indexOf("#") + 1) : link)) ||
        undefined,

      ...rest, // does not include `as`

      ...(anchored && anchorProps),
      ...(external && externalProps),
    }

    // use `react-scroll` for smooth scrolling when link is a hash
    const Tag = anchored ? HashLink : as

    if (wrap) return <Tag {...props}>{Child}</Tag>
    if (forwarded) return withNewProps(Child, { ...props, forwardedAs: Tag })
    return withNewProps(Child, { ...props, as: Tag })
  })
