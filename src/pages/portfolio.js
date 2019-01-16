import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
  Dimmer,
  Segment,
  Container,
  Header,
  Image,
  Grid
} from 'semantic-ui-react'

import Template from '../Template'

const PortfolioItem = styled(Dimmer.Dimmable)`
  height: 100%;
  
  & > .ui.simple.dimmer {
    display: flex;
  }
  
  .content .header {
    color: rgba(0,0,0,.87) !important;
  }

  .profile-image {
    height: 100%;
    object-fit: cover;
  }
`

// TODO: instate for and split from above when not using gatsby
// const PortfolioImage = styled(Image)`
//     height: 100%;
//     object-fit: cover;
// `

const portfolio = ({ data }) => {
  const { title, piece } = data.allContentfulPortfolio.edges[0].node
  const [hovered, setHovered] = useState('')

  return (
    <Template>
      <Segment padded vertical basic>
        <Container>
          <Header as='h1'>{title}</Header>
        </Container>
        <Segment padded vertical basic>
          <Container>
            <Grid
              textAlign='center'
              columns={3}
              stackable
            >
              {piece.map(p => (
                <Grid.Column>
                  <PortfolioItem
                    // REVIEW: use id not url
                    dimmed={p === hovered}
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered('')}
                  >
                    <Dimmer inverted simple>
                      <Header as='h2'>
                        {p.name}
                      </Header>
                      <Header as='h3'>
                        {p.location}
                      </Header>
                    </Dimmer>

                    <GImage as={Image} className='profile-image' centered fluid={p.image.fluid} />
                  </PortfolioItem>
                </Grid.Column>
              ))}
            </Grid>
          </Container>
        </Segment>
      </Segment>
    </Template>
  )
}

portfolio.propTypes = {
  rawData: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

portfolio.defaultProps = {
  rawData: {}
}

export default portfolio

export const dataQuery = graphql`
  query {
    allContentfulPortfolio(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          piece {
            name
            location
            image {
              fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
