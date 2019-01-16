import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Dimmer } from 'semantic-ui-react'
import { Hero, Blurbs } from '../components'
import Template from '../Template'
import theme from '../theme'

import baylor from '../../static/baylor.jpg'

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
        background={hero.backgrounds[0].fluid}
        title={hero.title}
        subtitle={hero.subtitle}
      />
      <Blurbs
        color={theme.blue}
        blurbs={blurbs}
      />
    </Template>
    // </Dimmer.Dimmable>

  )
}

Index.propTypes = {
  rawData: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Index.defaultProps = {
  rawData: {}
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
