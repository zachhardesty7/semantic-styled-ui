import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'

import styled from 'styled-components'
import {
  Modal,
  Container,
  Header,
  Card,
  Grid,
  Segment
} from 'semantic-ui-react'

import { defaultColors, utils } from '../utils'

// TODO: conditional swap to "img" when not using gatsby?
const ProfileImage = styled(GImage)`
  height: 300px;
  object-fit: cover;
  object-position: 50% 40%;
`

const ModalImage = styled(GImage)`
  object-fit: cover;
  object-position: 50% 10%;
`

const ModalContact = styled.div`
  padding-top: 1.5em;

  a {
    color: ${({ theme }) => theme?.primary || defaultColors.primary};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme?.primary || defaultColors.primary};
      filter: brightness(225%);
      text-decoration: underline;
    }
  }
`

const about = ({ data }) => {
  const { title, subtitle, cards } = data.allContentfulAbout.edges[0].node

  return (
    <Segment padded vertical basic>
      <Helmet>
        <title>About</title>
      </Helmet>

      <Container text textAlign='justified'>
        <Header as='h1'>{title}</Header>
        <Header.Content>{subtitle.subtitle}</Header.Content>
      </Container>

      <Segment vertical padded basic>
        <Container>
          <Card.Group doubling stackable centered itemsPerRow={4}>
            {cards.map(card => (
              <Modal
                // impossible to style a modal portalled in
                // due to .root.root.root overrides
                // must use semi-hacky extra root class
                // REVIEW: use "mountNode" prop with passed ref? how to get ref?
                // would allow mounting underneath ".root" div instead of document.body
                className='root'
                key={utils.process(card.name)}
                closeIcon
                trigger={(
                  <Card
                    image={<ProfileImage fluid={card.image.fluid} />}
                    header={card.name}
                    meta={card.title}
                  />
                )}
              >
                <Modal.Header>
                  {card.name}
                  <br />
                  {card.title}
                </Modal.Header>
                <Modal.Content scrolling>
                  <Grid columns={2} stackable>
                    <Grid.Column computer={7} textAlign='left'>
                      <ModalImage centered size='large' fluid={card.image.fluid} />
                      <ModalContact>
                        <p>{card.phone}</p>
                        <a href={`mailto:${card.email}`}>{card.email}</a>
                      </ModalContact>
                    </Grid.Column>
                    <Grid.Column computer={9} textAlign='justified'>
                      <Modal.Description>
                        {card.bio.content.map(paragraph => (
                          <p key={utils.process(paragraph.content[0].value.slice(0, 8))}>
                            {paragraph.content[0].value}
                          </p>
                        ))}
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
  )
}

about.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

about.defaultProps = {
  data: {}
}

export default React.memo(about)

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
              content {
                content {
                  value
                }
              }
            }
            email
            phone
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
