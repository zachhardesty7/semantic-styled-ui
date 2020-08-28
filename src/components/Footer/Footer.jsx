import React, { useLayoutEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { Container, Ref, Segment } from "semantic-ui-react"

import { Flexbox } from "../Flexbox"

import {
  getBackgroundColor,
  getColor,
  getHoverColor,
  margin,
  media,
  withNewProps,
  withTag,
} from "../../utils"

import { FooterContent } from "./FooterContent"

const S = {} // styled-components namespace

const ForwardedSegment = React.forwardRef(({ children, ...rest }, ref) => (
  <Ref innerRef={ref}>
    <Segment {...rest}>{children}</Segment>
  </Ref>
))

S.Segment = styled(ForwardedSegment)`
  font-size: 0.85em;
  ${margin("top")("0")};
  ${getColor("light")};
  ${getBackgroundColor("primary")};

  a:link,
  a:visited {
    text-decoration: underline;
    ${getColor("light")};
    ${getHoverColor("white")};
  }

  i {
    text-decoration: none;
  }

  a i {
    text-decoration: none;
  }

  a > i {
    text-decoration: none;
  }

  a > * {
    text-decoration: none;
  }
`

S.Flexbox = styled(Flexbox)`
  @media ${media.mobile} {
    justify-content: center;
  }
`

const Footer = ({
  color = "",
  backgroundColor = "",
  sticky = true,
  fullWidth = false,
  inverted = false,
  light = false,
  children = [],
  ...rest
}) => {
  /** @type {React.MutableRefObject<HTMLNode>} */
  const con = useRef()

  // update parent container to flex and apply grow to the prev sibling
  // enable dynamic sized footer that stays at the bottom, even when there's little content
  useLayoutEffect(() => {
    if (sticky && con?.current) {
      let el = con.current.parentNode

      el.children[el.children.length - 2].style.flex = "1 0 auto"
      el.style.display = "flex"
      el.style.flexDirection = "column"

      el.style.minHeight = "100vh"
      el = el.parentNode
    }
  })

  const childrenArr = React.Children.toArray(children)

  if (childrenArr.length > 2)
    console.warn(
      `Footer only supports up to 2 children, the first 2 children provided will be used`
    )

  return (
    // bug in "semantic-ui-react": ">0.85.0"
    // code is incorrectly identifying Child as a forwardRef despite
    // eventual child rendering as functional component, manually override
    // https://github.com/Semantic-Org/Semantic-UI-React/pull/3405/commits/d6f29a9f515cfe48628e90af7311c9f823beef7a
    <Ref innerRef={con}>
      <S.Segment
        forwardedAs="footer"
        $color={color || (light ? "grey" : undefined)}
        $backgroundColor={backgroundColor}
        basic
        vertical
        {...rest}
      >
        <Container fluid={fullWidth}>
          <S.Flexbox justify="split" wrap>
            {childrenArr[0] && withNewProps(childrenArr[0], { light })}
            {childrenArr[1] && withNewProps(childrenArr[1], { light })}
          </S.Flexbox>
        </Container>
      </S.Segment>
    </Ref>
  )
}

Footer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them, edit the d.ts file and run any "yarn build"    |
  // ----------------------------------------------------------------------
  /**
   * apply css supported color string to background, overrides theme / default
   */
  backgroundColor: PropTypes.string,
  /**
   * primary content rendered inside the footer
   *
   * **NOTE: only supports 2 or less children**
   */
  children: PropTypes.node,
  /**
   * apply css supported color string to content, overrides theme / default
   */
  color: PropTypes.string,
  /**
   * allow footer to stretch to edges
   */
  fullWidth: PropTypes.bool,
  /**
   * set color to secondary, colorHover to primary
   */
  inverted: PropTypes.bool,
  /**
   * attach footer to bottom of page when little content
   */
  sticky: PropTypes.bool,
}

export { Footer }

Footer.Content = withTag("SSUI", FooterContent)
