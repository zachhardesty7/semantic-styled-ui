import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'
import styled, { createGlobalStyle } from 'styled-components'

import {
  Image,
  Modal,
  Container,
  Header,
  Card,
  Grid,
  Segment
} from 'semantic-ui-react'

import Template from '../Template'

// TODO: conditional swap to "img" when not using gatsby
const ProfileCard = styled(Card)`
  .gatsby-image-wrapper {
    height: 300px;
    object-fit: cover;
    object-position: 50% 40%;
  }
`

// impossible to style a modal portalled in
// y due to .root.root.root overwrites
// must use global styles
const ProfileModalStyle = createGlobalStyle`
  .profile-image {
    object-fit: cover;
    object-position: 50% 10%;
  }
  .profile-contact {
    padding-top: 1.5em;
  }
`

const about = ({ data }) => {
  const { title, subtitle, cards } = data.allContentfulAbout.edges[0].node

  return (
    <Template>
      <Segment padded vertical basic>
        <Container text textAlign='justified'>
          <Header as='h1'>{title}</Header>
          <Header.Content>
            {subtitle.subtitle}
          </Header.Content>
        </Container>

        <Segment vertical padded basic>
          <Container>
            <Card.Group doubling centered itemsPerRow={4}>
              {cards.map(card => (
                <Modal
                  closeIcon
                  trigger={(
                    <ProfileCard
                      image={<GImage as={Image} fluid={card.image.fluid} />}
                      header={card.name}
                      meta={card.title}
                    />
                  )}
                >
                  <ProfileModalStyle />
                  <Modal.Header>
                    {card.name}
                    ,
                    {card.title}
                  </Modal.Header>
                  <Modal.Content scrolling>
                    <Grid columns={2} stackable>
                      <Grid.Column computer={7} textAlign='left'>
                        <GImage as={Image} className='profile-image' centered size='large' fluid={card.image.fluid} />
                        <div className='profile-contact'>
                          {card.contact}
                        </div>
                      </Grid.Column>
                      <Grid.Column computer={9} textAlign='justified'>
                        <Modal.Description>
                          {card.bio.bio}
                        </Modal.Description>
                      </Grid.Column>
                    </Grid>

                  </Modal.Content>
                </Modal>
              ))}
            </Card.Group>
          </Container>
        </Segment>
      </Segment>
    </Template>
  )
}

about.propTypes = {
  rawData: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

about.defaultProps = {
  rawData: {}
}

export default about

export const dataQuery = graphql`
  query {
    allContentfulAbout(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          subtitle {
            subtitle
          }
          cards {
            name
            title
            bio {
              bio
            }
            contact
            image {
              title
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
