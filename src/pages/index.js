import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Dimmer } from 'semantic-ui-react'
import { Hero, Blurbs } from '../components'
import Template from '../Template'
import theme from '../theme'

const AAHero = styled(Hero)`
  @font-face {
    font-family: 'eurostile-lt-std-bold-oblique';
    font-weight: normal;
    font-style: normal;
    src: url('../../static/eurostile-lt-std-bold-oblique.ttf') format('truetype');
    font-display: swap;
  }

  font-family: 'eurostile-lt-std-bold-oblique', Tahoma, Arial, Helvetica, sans-serif !important;
`

const Index = ({ data }) => {
  // TODO: accomplish with loader
  const overlay = false // OG true
  // useLayoutEffect(() => { overlay = false })
  const { hero, blurbs } = data.allContentfulIndex.edges[0].node

  return (
    // <Dimmer.Dimmable dimmed={false}>
    <Template>
      <Dimmer inverted simple active={overlay} page />
      <Hero
        baseline='top'
        size='relaxed'
        underline={theme.accent}
        background={hero.backgrounds}
        title={hero.title}
        subtitle={hero.subtitle}
      />
      <Blurbs
        color={theme.primary}
        blurbs={blurbs}
      />
    </Template>
    // </Dimmer.Dimmable>

  )
}

Index.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Index.defaultProps = {
  data: {}
}

export default Index

export const dataQuery = graphql`
  query {
    allContentfulIndex(sort: {fields: [contentful_id]}) {
      edges {
        node {
          hero {
            title
            subtitle
            backgrounds {
              title
              fluid(maxWidth: 1920) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
          blurbs {
            title
            body {
              body
            }
          }
        }
      }
    }
  }
`
