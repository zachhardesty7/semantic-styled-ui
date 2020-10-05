import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { Menu } from "semantic-ui-react"

import { Link } from "../Link"

import { media } from "../../utils"

const S = {} // styled-components namespace

S.Item = styled(Menu.Item)`
  ${({ $pointing }) =>
    $pointing &&
    css`
      border-bottom: 2px solid rgba(34, 36, 38, 0.15);

      &.active {
        border-bottom: 2px solid #1b1c1d;
      }

      /* remove rounded edge that distorts underline */
      &:last-child {
        border-radius: 0;
      }

      /* mix primary menu w secondary menu style */
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `};

  /* REVIEW: report bug when placing this block before the prev */
  @media ${media.phone} {
    a {
      /*       font-size: 0.97rem; */
    }
  }
`

const NavigationItem = ({
  as = "a",
  link = "",
  stacked = false,
  pointing = false,
  children,
  ...rest
}) => (
  <Link
    onClick={(e) => e.currentTarget.blur()} // prevent keeping focus after navigating to new page
    as={as}
    forwarded // prevent getting caught by styled component `S.Item`
    link={link}
    {...rest}
  >
    <S.Item $pointing={pointing}>{children}</S.Item>
  </Link>
)

NavigationItem.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
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
   * primary content, usually string, used as link if link not provided
   */
  children: PropTypes.node,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.string,
  /**
   * formatted with active indicator
   */
  pointing: PropTypes.bool,
  /**
   * required to support stacking logo
   */
  stacked: PropTypes.bool,
}

export { NavigationItem }
