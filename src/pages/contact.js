import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import { Form } from '../components'
import Template from '../Template'

const contact = ({ data }) => {
  const {
    title, form, address, phone
  } = data.allContentfulContact.edges[0].node

  return (
    <Template>
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
    </Template>
  )
}

contact.propTypes = {
  rawData: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

contact.defaultProps = {
  rawData: {}
}

export default contact

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
