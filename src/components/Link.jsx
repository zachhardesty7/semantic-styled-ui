import React from "react"
import { Link as HashLink } from "react-scroll"

import { calcDuration, withProps } from "../utils"

export const Link = ({
  as = "a",
  link = "",
  wrap = false,
  forwarded = false,
  children,
  ...rest
}) =>
  React.Children.map(children, (Child) => {
    if (!Child) return false // prevent wrapping empty elements

    if (typeof Child !== "object" && !wrap) {
      console.info(
        "SSUI Link component should not be passed primitive type children unless `wrap` is also passed.",
        "children will be wrapped automatically for now."
      )
      // eslint-disable-next-line no-param-reassign
      wrap = true
    }

    // const isExternal =
    //   window &&
    //   link.startsWith("http") &&
    //   new URL(link)?.origin !== window.location.origin
    const isExternal =
      window &&
      link.includes(":") &&
      new URL(link)?.origin !== window?.location.origin
    const isAnchor = !isExternal && link.includes("#")

    const anchorProps = {
      spy: true,
      smooth: true,
      duration: calcDuration,
      // reset hash link identifier
      onClick: () =>
        window?.history.pushState("", document.title, window.location.pathname),
    }

    const externalProps = {
      rel: "noopener noreferrer",
      target: "_blank",
    }

    // clean url if user accidentally includes hostname
    const url =
      window &&
      link.startsWith("http") &&
      new URL(link)?.origin === window?.location.origin
        ? link.replace(window?.location.origin, "")
        : link

    const props = {
      href: (!isAnchor && url) || undefined,

      // remove "#" if internal anchor, `to` is included for internal non-anchors urls
      // that are not using the default `as="a"`
      to:
        (url &&
          !isExternal &&
          (isAnchor ? url.slice(url.indexOf("#") + 1) : as !== "a" && url)) ||
        undefined,

      ...rest, // NOTE: does not include `as`

      ...(isAnchor && anchorProps),
      ...(isExternal && externalProps),
    }

    // use `react-scroll` for smooth scrolling hash/anchor links
    const Tag = isAnchor ? HashLink : as

    if (wrap) return <Tag {...props}>{Child}</Tag>
    if (forwarded) return withProps(Child, { ...props, forwardedAs: Tag })
    return withProps(Child, { ...props, as: Tag })
  })
