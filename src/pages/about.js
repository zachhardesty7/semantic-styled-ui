import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

import {
  Image,
  Modal,
  Container,
  Header,
  Card,
  Sticky,
  Segment
} from 'semantic-ui-react'

// user-defined
import './about.scss'

import profileAustin from '../../static/austin-profile.jpg'
import profileWynn from '../../static/wynn-profile.jpg'

// import { Hero } from '../components'
import Template from '../templates'

const about = ({ data }) => {
  const ref1 = React.createRef()

  return (
    <Template>
      <Segment vertical basic>
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
      </Segment>
      <Segment vertical basic secondary>
        <Container>
          <Card.Group centered itemsPerRow={4}>
            <Modal
              closeIcon
              // size='large'
              trigger={(
                <Card
                  image={profileAustin}
                  className='profile-short'
                  header='Austin Ames'
                  meta='CEO'
                />
              )}
            >
              <Modal.Header>Austin Ames, CEO</Modal.Header>
              <Modal.Content scrolling ref={ref1}>
                <Sticky context={ref1}>
                  <Image size='large' src={profileAustin} float='left' className='profile-full' />
                </Sticky>
                <Modal.Description>
                  <p>
                    Known as an innovator for streamlining commercial real estate
                    services and development, Austin employs a “hands on” approach
                    to all Gulf projects providing creative solutions to complex real estate
                    decisions for all clients. Austin has spent his entire life in and around
                    commercial real estate development.
                  </p>
                  <p>
                    Austin is a native of Mississippi and a graduate of Ole Miss. Following
                    his Junior year, Austin left Ole Miss for Charlotte, NC to pursue his
                    lifelong passion and continue his racing career driving and racing at
                    some of the highest levels of American auto racing, including NASCAR.
                  </p>
                  <p>
                    After racing, he moved to Dallas and began his real estate career at Mohr
                    Partners as a tenant rep broker. By his third month, Austin landed one of the
                    largest office transactions in the Dallas area with one of the largest and most
                    prestigious law firms in the world, the Locke Lord headquarters requirement.
                    After a successful tenure in commercial brokerage, Austin moved to the private
                    equity division of Mohr where he was named Director of Development and
                    Acquisitions.
                  </p>
                  <p>
                    While at Mohr Capital, Austin completed several large transactions for Fortune
                    500 and other reputable companies including Comcast and Baylor Health. In 2014,
                    with a solid client list, Austin founded Gulf Corporation. Today Gulf Corp, is
                    one of the premier real estate developers in the southeastern United States.
                  </p>
                  <p>
                    Austin resides in Dallas, Texas with family interests in Dallas and the
                    Mississippi Gulf Coast. Austin spends his spare time racing when possible and
                    is an avid golfer and outdoors man. Austin and Gulf Corp are proud supporters of
                    Ole Miss and Ole Miss Athletics.
                  </p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Modal
              trigger={(
                <Card
                  image={profileWynn}
                  className='profile-short'
                  header='Wynn Searle'
                  meta='CEO'
                />
              )}
            >
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content image>
                {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
                <Modal.Description>
                  <Header>Default Profile Image</Header>
                  <p>
                    We've found the following gravatar image associated with your
                    e-mail address.
                  </p>
                  <p>Is it okay to use this photo?</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Card.Group>
        </Container>
      </Segment>
    </Template>
  )
}

about.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

about.defaultProps = {
  data: {}
}

export default about
