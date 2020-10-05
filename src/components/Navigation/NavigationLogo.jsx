import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { NavigationItem } from "./NavigationItem"

import { logoSizes, logoSizesSVG, margin, media } from "../../utils"

const S = {} // styled-components namespace

// css functions not necessary but add syntax highlighting
// if stacked, set stacked logo spacing & remove underline
S.Wrapper = styled.div`
  align-self: center;

  ${({ $stacked }) =>
    $stacked &&
    css`
      ${margin("horizontal")("50%")};

      & > .item {
        border-bottom: none;
      }
    `};
`

// use "!important" to override Gatsby-Image inline style
S.Logo = styled.div`
  position: relative !important;
  height: 3em !important;
  width: auto !important;
  /* height: 100% !important;
  width: 100% !important; */

  /* FIXME: does not work with Gatsby probably */
  /* reset weird behavior in gatsby */
  /* will work with regular img child or gatsby-image picture element */
  /* img:last-child {
    position: relative !important;
    width: ${({ $logoSize }) => logoSizes[$logoSize]}px !important;

    @media ${media.phone} {
      width: ${({ $logoSize }) => logoSizes[$logoSize] * 0.8}px !important;
    }
  }

  svg {
    padding: 0.6em;
    vertical-align: middle;
    width: ${({ logoSize }) => logoSizesSVG[logoSize]}em;

    @media ${media.phone} {
      width: ${({ logoSize }) => logoSizesSVG[logoSize] * 0.8}em;
    }
  } */
`

const NavigationLogo = ({
  as = "a",
  link = "/",
  stacked = false,
  logoSize = "base",
  className = "",
  children,
  ...rest
}) => (
  <S.Wrapper $stacked={stacked} className={className}>
    <NavigationItem as={as} link={link} stacked={stacked} {...rest}>
      <S.Logo as={children.type} {...children.props} $logoSize={logoSize} />
    </NavigationItem>
  </S.Wrapper>
)

NavigationLogo.propTypes = {
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
   * primary content, usually a string
   */
  children: PropTypes.node,
  /**
   * additional or pass thru classes for composition
   */
  className: PropTypes.string,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.string,
  /**
   * simple em based size
   */
  logoSize: PropTypes.oneOf(["base", "large", "small"]),
  /**
   * required to support stacking logo
   */
  stacked: PropTypes.bool,
}

export { NavigationLogo }
