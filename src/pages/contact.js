import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

// user-defined
// import './contact.scss'

import { Form } from '../components'
import Template from '../templates'

const contact = ({ data }) => (
  <Template>
    <Segment padded vertical basic>
      <Container text>
        <Header as='h1'>Contact Us!</Header>
        <Form
          name='contact'
          fields={['Name', 'Email']}
          textArea='Questions, comments, or concerns'
        />
      </Container>
    </Segment>
  </Template>
)

contact.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

contact.defaultProps = {
  data: {}
}

export default contact
