import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { Header, Item } from "semantic-ui-react"
import { Flexbox } from "../Flexbox"

import { getColor, margin, media, spacingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

/**
 *
 * @typedef {typeof import("./index").Blurb} BB
 * @typedef {typeof import("../../../index").BlurbType} BB1
 * @typedef {typeof import("../../types").BlurbType} BB2
 */

S.Section = styled.section`
  text-align: ${({ $align }) => $align};
`

S.Header = styled(Header)`
  z-index: 10;
  position: relative;
  color: ${({ $color }) => $color};
  @media ${media.mobile} {
    text-align: center;
  }
`

S.Content = styled(Header.Content)`
  z-index: 10;
  text-align: ${({ $centered }) => $centered && "justify"};
  position: relative;

  /* break words at syllable in non-chrome browsers */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    text-align: ${({ $centered }) => $centered && "left"};
  }
`

S.BackgroundImage = styled.img`
  position: absolute !important;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: 3;
  img:last-child {
    object-fit: cover !important;
    object-position: 45% 55% !important;
  }
`

S.Icon = styled.span`
  ${getColor("primary")};
`

S.FlexIcon = styled(Flexbox)`
  @media not ${media.mobile} {
    ${margin("end")("base")};
  }

  @media ${media.mobile} {
    ${margin("bottom")("1.5em")};
  }
`
/**
 * @type {typeof import(".").Blurb}
 */
const Blurb = ({
  as = "h2",
  icon,
  backgroundImage,
  align = "center",
  header,
  color = "",
  vertical = false,
  children,
  ...rest
}) =>
  vertical ? (
    <>
      <Item {...rest}>
        {/* <ProcessDarkenedImage size="medium" rounded>
          <ProcessLabel ribbon size="huge">{`#${i + 1}`}</ProcessLabel>
          {item.image && (
            <GImage
              fixed={item.image.fixed}
              $backgroundColor
              alt={item.image.title}
            />
          )}
         </ProcessDarkenedImage> */}

        <S.FlexIcon align="center" justify="center">
          <S.Icon>{withNewProps(icon, { align })}</S.Icon>
        </S.FlexIcon>

        <Flexbox as={Item.Content} column justify="center">
          <S.Header forwardedAs={as}>{header}</S.Header>
          <Item.Description>{children}</Item.Description>
        </Flexbox>
      </Item>
    </>
  ) : (
    <S.Section $align={align} {...rest}>
      {backgroundImage && (
        <S.BackgroundImage as={backgroundImage.type} {...backgroundImage.props}>
          {backgroundImage.children}
        </S.BackgroundImage>
      )}

      {icon && <S.Icon>{withNewProps(icon, { align })}</S.Icon>}
      {header && (
        <S.Header forwardedAs={as} $color={color}>
          {header}
        </S.Header>
      )}

      {children && <S.Content $centered={align}>{children}</S.Content>}
    </S.Section>
  )

Blurb.propTypes = {
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
   * element type to render `header` as (string or function)
   *
   * supports HTML tag as a string or React component definition
   *
   * @example
   *
   * 'div'
   * 'section'
   * {ReactComponent}
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
   * element representing image to cover background
   */
  backgroundImage: PropTypes.node,
  children: PropTypes.node,
  /**
   * apply css supported color string to Header text, overrides theme / default
   */
  color: PropTypes.string,
  /**
   * primary content (styled as text)
   */
  header: PropTypes.node,
  /**
   * content above header
   */
  icon: PropTypes.node,
}

export { Blurb }
