import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import { Form } from '../components'

const contact = ({ data }) => {
  const {
    title, form, address, phone
  } = data.allContentfulContact.edges[0].node

  return (
    <Segment padded vertical basic>
      <Container text>
        <Header as='h1'>{title}</Header>
        <Form
          name={form.name}
          fields={form.inputs}
          textArea={form.textArea}
          button={form.button}
        />
        <Header.Content
          css='
              padding-top: 2.25em
            '
        >
          <p>{address.split('|')[0]}</p>
          <p>{address.split('|')[1]}</p>
          <p>{phone}</p>
        </Header.Content>
      </Container>
    </Segment>
  )
}

contact.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

contact.defaultProps = {
  data: {}
}

export default React.memo(contact)

export const dataQuery = graphql`
  query {
    allContentfulContact(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          address
          phone
          form {
            name
            inputs
            textArea
          }
        }
      }
    }
  }
`
