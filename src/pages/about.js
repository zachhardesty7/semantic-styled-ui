import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

import {
  Image,
  Modal,
  Container,
  Header,
  Card,
  // Sticky,
  Grid,
  Segment
} from 'semantic-ui-react'

// user-defined
import './about.scss'

import profileAustin from '../../static/austin-profile.jpg'
import profileWynn from '../../static/wynn-profile.jpg'

import Template from '../templates'

const about = ({ data }) => (
  <Template>
    <Segment padded vertical basic>
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
    <Segment vertical padded basic>
      <Container>
        <Card.Group doubling centered itemsPerRow={4}>
          <Modal
            closeIcon
            trigger={(
              <Card
                image={profileAustin}
                className='profile-short'
                header='Austin Ames'
                meta='CEO'
              />
            )}
          >
            <Modal.Header>Austin Ames, Chief Executive Officer</Modal.Header>
            <Modal.Content scrolling>
              <Grid columns={2} stackable>
                <Grid.Column computer={7} textAlign='center'>
                  <Image centered size='large' src={profileAustin} className='profile-full' />
                </Grid.Column>
                <Grid.Column computer={9} textAlign='justified'>
                  <Modal.Description>
                    <p>
                      {'Known as an innovator for streamlining commercial real estate services and development, Austin employs a “hands on” approach to all Gulf projects providing creative solutions to complex real estate decisions for all clients. Austin has spent his entire life in and around commercial real estate development.'}
                    </p>
                    <p>
                      {'Austin is a native of Mississippi and a graduate of Ole Miss. Following his Junior year, Austin left Ole Miss for Charlotte, NC to pursue his lifelong passion and continue his racing career driving and racing at some of the highest levels of American auto racing, including NASCAR.'}
                    </p>
                    <p>
                      {'After racing, he moved to Dallas and began his real estate career at Mohr Partners as a tenant rep broker. By his third month, Austin landed one of the largest office transactions in the Dallas area with one of the largest and most prestigious law firms in the world, the Locke Lord headquarters requirement. After a successful tenure in commercial brokerage, Austin moved to the private equity division of Mohr where he was named Director of Development and Acquisitions.'}
                    </p>
                    <p>
                      {'While at Mohr Capital, Austin completed several large transactions for Fortune 500 and other reputable companies including Comcast and Baylor Health. In 2014, with a solid client list, Austin founded Gulf Corporation. Today Gulf Corp, is one of the premier real estate developers in the southeastern United States.'}
                    </p>
                    <p>
                      {'Austin resides in Dallas, Texas with family interests in Dallas and the Mississippi Gulf Coast. Austin spends his spare time racing when possible and is an avid golfer and outdoors man. Austin and Gulf Corp are proud supporters of Ole Miss and Ole Miss Athletics.'}
                    </p>
                  </Modal.Description>
                </Grid.Column>
              </Grid>

            </Modal.Content>
          </Modal>

          <Modal
            trigger={(
              <Card
                image={profileWynn}
                className='profile-short'
                header='Wynn Searle'
                meta='Executive VP'
              />
            )}
          >
            <Modal.Header>
              Noel E. “Wynn” Searle, AIA - Executive Vice President, Development
            </Modal.Header>
            <Modal.Content>
              <Grid columns={2} stackable>
                <Grid.Column computer={7} textAlign='center'>
                  <Image centered size='large' src={profileWynn} className='profile-full' />
                </Grid.Column>
                <Grid.Column computer={9} textAlign='justified'>
                  <Modal.Description>
                    <p>
                      {'Wynn Searle is Executive Vice President of Development and President of Gulf Corp’s Healthcare division. He is one of the founding members of Gulf Corp. Wynn oversees all of Gulf’s healthcare projects, specializing in leading edge medical facilities from investments to new development opportunities.'}
                    </p>
                    <p>
                      {'Wynn is an energetic senior executive with a proven track record in all facets of healthcare project delivery including real estate development, business development and strategic plan development and execution. He has an exceptional ability in developing relationships with medical professionals, governing boards, and internal and external project stakeholders. Wynn has experience managing new facility development, facility expansions and joint venture partnerships with established hospitals and physician groups'}
                    </p>
                    <p>
                      {'Wynn began his career in a healthcare architect and was responsible for the design of numerous facilities around the United States. In 1994, he was instrumental in the design and implementation of a new heart hospital model for MedCath Corporation, which revolutionized the delivery of cardiovascular care and helped spur wide-scale development of heart hospitals and other specialized service hospitals nationwide.'}

                    </p>
                    <p>
                      {'In 1996 Wynn was invited to join MedCath to develop the new heart hospital model nationally. As Vice President of Operations / Hospital Development, he was directly responsible for over $500 million in new facility development and the opening of eleven (11) hospitals. During his tenure, he gained extensive experience interacting with physician partners, medical staff members, hospital administrators and clinical staff members, as well as community and government leaders.'}

                    </p>
                    <p>
                      {'In 2006 Wynn joined with other former senior executives of MedCath to form NewHope Bariatrics, Inc., an organization founded to develop, own and operate ambulatory surgical centers designed to address the weight loss and co-morbidity needs of obese patients.'}
                    </p>
                    <p>
                      {'In 2009 Wynn was influential in the formation and opening of Mohr Health, LLC, a development company focusing on general acute, post-acute, sub-acute, medical office and other medical facilities for healthcare clients nationally. He has served on the Board of Directors of several hospitals and ambulatory surgery centers, is a registered architect and earned his Bachelor of Architecture at Texas Tech University.'}
                    </p>
                  </Modal.Description>
                </Grid.Column>
              </Grid>
            </Modal.Content>
          </Modal>

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
