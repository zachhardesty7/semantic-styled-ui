import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { Header } from "semantic-ui-react"

import { margin, media, padding, spacingMap } from "../utils"

const S = {} // styled-components namespace

S.Header = styled(Header)`
  ${margin("bottom")("1.25em", ["internal"])};
  ${({ $padded }) =>
    ($padded === "top" && padding("top")(spacingMap.base)) ||
    ($padded === "bottom" && padding("bottom")(spacingMap.base)) ||
    ($padded && padding("vertical")(spacingMap.base))};
`

S.Title = styled.div`
  text-align: ${({ $textAlign }) => $textAlign};
  @media ${media.mobile} {
    text-align: center;
  }
`

S.Subtitle = styled(Header.Subheader)`
  text-align: ${({ $textAlign }) => $textAlign};
`

// TODO: test mobile, may need `container` on `Grid`
const Title = ({
  as = "h1",
  subtitle = null,
  textAlign = "left",
  textAlignSub = "left",
  padded = false,
  children,
  ...rest
}) =>
  (children || subtitle) && (
    <S.Header $padded={padded} {...rest}>
      {children && (
        <S.Title as={as} $textAlign={textAlign}>
          {children}
        </S.Title>
      )}

      {subtitle && (
        <S.Subtitle $textAlign={textAlignSub}>{subtitle}</S.Subtitle>
      )}
    </S.Header>
  )

Title.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * what the main content is rendered as
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
   * main title content
   */
  children: PropTypes.node,
  /**
   * if/where spacing around element exists
   */
  padded: PropTypes.oneOfType([
    PropTypes.oneOf(["both", "bottom", "top"]),
    PropTypes.bool,
  ]),
  /**
   * subtitle content
   */
  subtitle: PropTypes.node,
  /**
   * format title content
   */
  textAlign: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
  /**
   * format body / subtitle content
   */
  textAlignSub: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
}

export { Title }
