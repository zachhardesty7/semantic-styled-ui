import React from "react"
import PropTypes from "prop-types"
import { Link as HashLink } from "react-scroll"

import { calcDuration, withProps } from "../utils"

const Link = ({
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
      console.warn(
        "SSUI Link component should not be passed primitive type children unless `wrap` is also passed.",
        "children will be wrapped automatically for now.",
        "Child content:",
        Child
      )

      // eslint-disable-next-line no-param-reassign
      wrap = true
    }

    // const isExternal =
    //   window &&
    //   link.startsWith("http") &&
    //   new URL(link)?.origin !== window.location.origin
    const isExternal =
      globalThis &&
      link.includes(":") &&
      new URL(link)?.origin !== globalThis?.location?.origin
    const isAnchor = !isExternal && link.includes("#")

    const anchorProps = {
      spy: true,
      smooth: true,
      duration: calcDuration,
      // reset hash link identifier
      onClick: () =>
        globalThis?.history?.pushState(
          "",
          document.title,
          globalThis?.location?.pathname
        ),
    }

    const externalProps = {
      rel: "noopener noreferrer",
      target: "_blank",
    }

    // clean url if user accidentally includes hostname
    const url =
      globalThis &&
      link.startsWith("http") &&
      new URL(link)?.origin === globalThis?.location?.origin
        ? link.replace(globalThis?.location?.origin, "")
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

Link.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * element type to render as (string or function) supports HTML tag as a string or
   * React component definition
   * NOTE: ignored if `link` contains a "#"
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.oneOfType([
    PropTypes.oneOf([
      "a",
      "abbr",
      "address",
      "animate",
      "animateMotion",
      "animateTransform",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "circle",
      "cite",
      "clipPath",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "defs",
      "del",
      "desc",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "ellipse",
      "em",
      "embed",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feDropShadow",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "fieldset",
      "figcaption",
      "figure",
      "filter",
      "footer",
      "foreignObject",
      "form",
      "g",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "image",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "line",
      "linearGradient",
      "link",
      "main",
      "map",
      "mark",
      "marker",
      "mask",
      "menu",
      "menuitem",
      "meta",
      "metadata",
      "meter",
      "mpath",
      "nav",
      "noindex",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "path",
      "pattern",
      "picture",
      "polygon",
      "polyline",
      "pre",
      "progress",
      "q",
      "radialGradient",
      "rect",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "slot",
      "small",
      "source",
      "span",
      "stop",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "svg",
      "switch",
      "symbol",
      "table",
      "tbody",
      "td",
      "template",
      "text",
      "textarea",
      "textPath",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "tspan",
      "u",
      "ul",
      "use",
      "var",
      "video",
      "view",
      "wbr",
      "webview",
    ]),
    PropTypes.func,
    PropTypes.shape({
      childContextTypes: PropTypes.object,
      contextType: PropTypes.shape({
        Consumer: PropTypes.func.isRequired,
        displayName: PropTypes.string,
        Provider: PropTypes.func.isRequired,
      }),
      contextTypes: PropTypes.object,
      defaultProps: PropTypes.object,
      displayName: PropTypes.string,
      getDerivedStateFromError: PropTypes.func,
      getDerivedStateFromProps: PropTypes.func,
      propTypes: PropTypes.object,
    }),
  ]),
  /**
   * primary content, usually a string, but handles multiple items by linking each of them
   */
  children: PropTypes.node,
  /**
   * when not wrapping, will convert `as` tag to `forwardedAs` for passing the prop thru a
   * `styled-components`
   */
  forwarded: PropTypes.bool,
  /**
   * hash link (prefixed with "#") or internal link applied via a new `to` field or can
   * be used as a standard href if a full link is provided
   *
   * @example
   * internal: "/blog/contact"
   * anchor: "#contact-section"
   * external: "https://example.com"
   */
  link: PropTypes.string,
  /**
   * creates a new element of the type of `as` tag and applies props newly created tag
   */
  wrap: PropTypes.bool,
}

export { Link }
