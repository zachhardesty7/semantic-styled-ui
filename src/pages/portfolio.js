import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import {
  Segment,
  Container,
  Header,
  Grid
} from 'semantic-ui-react'
import { PortfolioItem } from '../components'

import { process } from '../utils'

const portfolio = ({ data }) => {
  const { title, pieces } = data.allContentfulPortfolio.edges[0].node

  return (
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
            {pieces.map(piece => <PortfolioItem key={process(`${piece.name} ${piece.location}`)} piece={piece} />)}
          </Grid>
        </Container>
      </Segment>
    </Segment>
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
          pieces {
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
