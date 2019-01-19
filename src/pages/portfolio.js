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
  // FIXME: bad naming
  const { title, piece: pieces } = data.allContentfulPortfolio.edges[0].node
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
              {pieces.map(piece => (
                <Grid.Column>
                  <PortfolioItem
                    // REVIEW: use id not url
                    dimmed={piece === hovered}
                    onMouseEnter={() => setHovered(piece)}
                    onMouseLeave={() => setHovered('')}
                  >
                    <Dimmer inverted simple>
                      <Header as='h2'>
                        {piece.name}
                      </Header>
                      <Header as='h3'>
                        {piece.location}
                      </Header>
                    </Dimmer>

                    <GImage as={Image} className='profile-image' centered fluid={piece.image.fluid} />
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
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

portfolio.defaultProps = {
  data: {}
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
