import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

import {
  Container,
  Grid,
  Ref,
  Segment,
} from 'semantic-ui-react'

import {
  getBackgroundColor,
  getColor,
  getHoverColor,
  withNewProps,
} from '../../utils'

const S = {} // styled-components namespace

const ForwardedSegment = React.forwardRef(({ children, ...rest }, ref) => (
  <Ref innerRef={ref}><Segment {...rest}>{children}</Segment></Ref>
))

S.Segment = styled(ForwardedSegment)`
  margin-top: 0px;
  ${getColor('light')};
  ${getBackgroundColor('primary')};
`

S.Link = styled.a`
  text-decoration: underline;
  ${getColor('light')};
  ${getHoverColor('white')};
`

export const Footer = ({
  color = '',
  backgroundColor = '',
  colorHover = '',
  sticky = true,
  copyright = '',
  stacked = false,
  separated = false,
  fullWidth = false,
  inverted = false,
  icons = null,
  developerName = '',
  developerLink = '',
  ...rest
}) => {
  /** @type {React.MutableRefObject<HTMLNode>} */
  const con = useRef()

  // update parent containers to allow dynamic sized footer
  // that stays at the bottom, even when there's little content
  useLayoutEffect(() => {
    if (sticky && con?.current) {
      let el = con.current.parentNode

      el.children[el.children.length - 2].style.flex = '1 0 auto'
      el.style.display = 'flex'
      el.style.flexDirection = 'column'

      while (el.parentNode) {
        el.style.minHeight = '100vh'
        el = el.parentNode
      }
    }
  })

  return (
  // bug in "semantic-ui-react": ">0.85.0"
  // code is incorrectly identifying Child as a forwardRef despite
  // eventual child rendering as functional component, manually override
  // https://github.com/Semantic-Org/Semantic-UI-React/pull/3405/commits/d6f29a9f515cfe48628e90af7311c9f823beef7a
    <Ref innerRef={con}>
      <S.Segment
        forwardedAs='footer'
        $color={color}
        $backgroundColor={backgroundColor}
        {...rest}
      >
        <Container fluid={fullWidth}>
          <Grid columns={2} verticalAlign='middle'>
            {separated ? (
              <>
                <Grid.Column width={8}>
                  {`copyright © ${copyright}`}
                </Grid.Column>
                <Grid.Column width={8} textAlign='right'>
                  {'designed and developed by '}
                  <S.Link href={developerLink}>{developerName}</S.Link>
                </Grid.Column>
              </>
            ) : (
              <>
                <Grid.Column width={12}>
                  <div>
                    {`copyright © ${copyright}`}
                    {stacked ? <br /> : ' | '}
                    {'designed and developed by '}
                    <S.Link href={developerLink}>{developerName}</S.Link>
                  </div>
                </Grid.Column>
                <Grid.Column width={4} textAlign='right'>
                  <Container>
                    {React.Children.map(icons, (Child) => (
                      withNewProps(Child, { color, colorHover, inverted })
                    ))}
                  </Container>
                </Grid.Column>
              </>
            )}
          </Grid>
        </Container>
      </S.Segment>
    </Ref>
  )
}
