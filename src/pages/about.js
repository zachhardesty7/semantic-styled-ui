import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

import {
  Container,
  Header,
  Card,
  Segment
} from 'semantic-ui-react'

// user-defined
import './index.scss'

import { Hero } from '../components'
import Template from '../templates'

const about = ({ data }) => (
  <Template>
    <Segment vertical>
      <Container text>
        <Header as='h1'>About Us</Header>
        <Header.Content>
          Gulf Corp is a privately held, full-service real estate development and
          investment company focusing on the development of customized real property.
          A leader in commercial development across the southeastern US, Gulf’s services
          include development, acquisition, and financing. The Gulf Team consists of
          highly experienced professionals who have committed the entirety of their
          careers to the planning, financing, delivery and disposition of Office, Industrial,
          Healthcare, and Retail projects. The company’s unique blend of experience
          and skill sets provides the knowledge and expertise to solve any real estate
          challenges in a variety of markets and environments.
        </Header.Content>
      </Container>
      <Container>

        <Card.Group centered itemsPerRow={4}>
          <Card
            image=''
            header='Austin Ames'
            meta='CEO'
          />
          <Card
            image=''
            header='Wynne Searle'
            meta='CEO'
          />
        </Card.Group>
      </Container>
    </Segment>
  </Template>
)

about.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

about.defaultProps = {
  data: {}
}

export default about
