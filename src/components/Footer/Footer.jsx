import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"

import { Container, Grid, Ref, Segment } from "semantic-ui-react"

import { getBackgroundColor, getColor, getHoverColor } from "../../utils"

import { FooterContent } from "./FooterContent"

const S = {} // styled-components namespace

const ForwardedSegment = React.forwardRef(({ children, ...rest }, ref) => (
  <Ref innerRef={ref}>
    <Segment {...rest}>{children}</Segment>
  </Ref>
))

S.Segment = styled(ForwardedSegment)`
  margin-top: 0px;
  ${getColor("light")};
  ${getBackgroundColor("primary")};
`

S.Link = styled.a`
  text-decoration: underline;
  ${getColor("light")};
  ${getHoverColor("white")};
`

export const Footer = ({
  color = "",
  backgroundColor = "",
  sticky = true,
  fullWidth = false,
  inverted = false,
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
        $color={color}
        $backgroundColor={backgroundColor}
        {...rest}
      >
        <Container fluid={fullWidth}>
          <Grid
            columns={Math.min(childrenArr.length, 2)}
            verticalAlign="middle"
            centered={childrenArr.length !== 2}
          >
            {childrenArr[0] && <Grid.Column>{childrenArr[0]}</Grid.Column>}
            {childrenArr[1] && (
              <Grid.Column textAlign="right">{childrenArr[1]}</Grid.Column>
            )}
          </Grid>
        </Container>
      </S.Segment>
    </Ref>
  )
}

Footer.Content = FooterContent
