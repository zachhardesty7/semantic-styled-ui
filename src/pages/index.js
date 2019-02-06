import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import styled from 'styled-components'
import { Hero } from '../components'
import { Blurbs } from '../components/sections'

import { colors } from '../utils'

const Slider = styled(Hero)`
  @font-face {
    font-family: 'Eurostile';
    font-style: italic;
    src: url('../../static/eurostile-lt-std-bold-oblique.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Franklin Gothic Book';
    src: url('../../static/franklin-gothic-book-regular.ttf') format('truetype');
    font-weight: bolder;
    font-display: swap;
  }

  h1 {
    line-height: 1em;
    margin-bottom: 0;
    vertical-align: baseline;
    font-weight: bolder;
    font-style: italic;
    font-family: 'Franklin Gothic Book', Tahoma, Arial, Helvetica, sans-serif !important;
  }

  h2 {
    margin-top: 0;
    font-style: italic;
    font-weight: normal;
    font-family: 'Eurostile', Tahoma, Arial, Helvetica, sans-serif !important;
  }
`

const Index = ({ data }) => {
  const { hero, blurbs } = data.allContentfulIndex.edges[0].node

  return (
    <>
      <Slider
        baseline='top'
        size='relaxed'
        underline={({ theme }) => theme.accent || colors.accent}
        background={hero.backgrounds}
        title={hero.title}
        subtitle={hero.subtitle}
      />
      <Blurbs
        color={({ theme }) => theme.primary || colors.primary}
        blurbs={blurbs}
      />
    </>
  )
}

Index.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Index.defaultProps = {
  data: {}
}

export default React.memo(Index)

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
