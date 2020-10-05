import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { Icon } from "semantic-ui-react"
import { Link } from "../Link"
import { defaultColors, iconMap, margin, withTag } from "../../utils"
import { IconLinkGroup } from "./IconLinkGroup"

const S = {} // styled-components namespace

S.Icon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $size }) => iconMap[$size]};
  padding: ${({ $group }) => ($group ? "0 0.5em" : "0")};
  ${margin("all")("0")};
  opacity: 1;

  /* if color not provided */
  /* if light, try light theme then default */
  /* if inverted, try secondary theme then default */
  /* else use primary color */
  color: ${({ $color, $light, $inverted, theme }) =>
    $color ||
    ($light && (theme.light || defaultColors.light)) ||
    ($inverted && (theme.secondary || defaultColors.secondary)) ||
    theme.primary ||
    defaultColors.primary};

  ${({ link }) =>
    link &&
    css`
      ${S.Wrapper}:hover & {
        /* cursor: pointer; */
        opacity: 1;
        /* if colorHover not provided */
        /* if light, try white theme then default */
        /* if inverted, try secondary theme then default */
        /* else use primary color */
        color: ${({
          /* eslint-disable indent */
          $colorHover,
          $light,
          $inverted,
          theme,
        }) =>
          $colorHover ||
          ($light && (theme.white || defaultColors.white)) ||
          ($inverted && (theme.primary || defaultColors.primary)) ||
          theme.secondary ||
          defaultColors.secondary};
      }
    `};
`

S.Label = styled.span`
  color: ${({ $color, $light, $inverted, theme }) =>
    $color ||
    ($light && (theme.light || defaultColors.light)) ||
    ($inverted && (theme.secondary || defaultColors.secondary)) ||
    theme.primary ||
    defaultColors.primary};

  ${({ $link }) =>
    $link &&
    css`
      ${S.Wrapper}:hover & {
        color: ${({ $colorHover, $light, $inverted, theme }) =>
          $colorHover ||
          ($light && (theme.white || defaultColors.white)) ||
          ($inverted && (theme.primary || defaultColors.primary)) ||
          theme.secondary ||
          defaultColors.secondary};
      }
    `};
`

/* eslint-enable indent */

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) =>
    $align === "center" ? $align : `flex-${$align}`};
  justify-content: ${({ $align }) =>
    $align === "center" ? $align : `flex-${$align}`};
`

const IconLink = ({
  as,
  name = "",
  label = "",
  link = "",
  align = "center",
  size = "medium",
  light = false,
  inverted = false,
  fitted = false,
  color = "",
  colorHover = "",
  ...rest
}) => (
  <S.Wrapper $align={align}>
    {link ? (
      <Link
        wrap
        aria-label={!label ? `${name} icon link` : undefined}
        as={as}
        link={typeof link !== "boolean" ? link : undefined}
        {...rest}
      >
        <S.Icon
          name={name.toLowerCase()}
          link={!!link}
          fitted={fitted}
          $size={size}
          $inverted={inverted}
          $light={light}
          $color={color}
          $colorHover={colorHover}
        />

        {label && (
          <S.Label
            $link
            $inverted={inverted}
            $light={light}
            $color={color}
            $colorHover={colorHover}
          >
            {label === true ? name : label}
          </S.Label>
        )}
      </Link>
    ) : (
      <>
        <S.Icon
          // forwardedAs={as}
          name={name.toLowerCase()}
          fitted={fitted}
          $size={size}
          $inverted={inverted}
          $light={light}
          $color={color}
          $colorHover={colorHover}
          {...rest}
        />

        {label && (
          <S.Label
            $inverted={inverted}
            $light={light}
            $color={color}
            $colorHover={colorHover}
          >
            {label === true ? name : label}
          </S.Label>
        )}
      </>
    )}
  </S.Wrapper>
)

IconLink.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  /**
   * position / justification of all content
   */
  align: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
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
  children: PropTypes.node,
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color: PropTypes.string,
  /**
   * apply css supported color string to Icon and text on hover, overrides theme / default
   */
  colorHover: PropTypes.string,
  /**
   * set color to secondary, colorHover to primary
   */
  inverted: PropTypes.bool,
  /**
   * display a text string with the icon
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * set color to grey, colorHover to white
   */
  light: PropTypes.bool,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * icon name as supported by Font Awesome 5.0.8
   *
   * @see - [Icon Name Reference Sheet](https://react.semantic-ui.com/elements/icon/)
   */
  name: PropTypes.string.isRequired,
  /**
   * size based on "em" units
   */
  size: PropTypes.oneOf([
    "big",
    "bigger",
    "huge",
    "large",
    "massive",
    "medium",
    "mini",
    "small",
    "tiny",
  ]),
}

export { IconLink }

IconLink.Group = withTag("SSUI", IconLinkGroup)
