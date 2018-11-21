import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'

import SocialMediaIcons from './SocialMediaIcons'
import './Footer.scss'

const Footer = ({ copyright }) => (
  <Segment inverted vertical id='bottom-bar'>
    <Container>
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column id='attribution' width={12}>
          {`copyright© ${copyright} | designed and developed by `}
          <a href='https://zachhardesty.com'>Zach Hardesty</a>
        </Grid.Column>
        <Grid.Column width={4} id='bottom-bar-icons' floated='right' textAlign='right'>
          <SocialMediaIcons
            inverted
            icons={[
              {
                name: 'Facebook',
                link: 'https://www.facebook.com/theconnectdoor/'
              },
              {
                name: 'Twitter',
                link: 'https://twitter.com/ConnectDoor/'
              },
              {
                name: 'Instagram',
                link: 'https://instagram.com/ConnectDoor/'
              },
              {
                name: 'Linkedin',
                link: 'https://www.linkedin.com/company/connect-door/'
              }
            ]}
          />
        </Grid.Column>
      </Grid>
    </Container>
  </Segment>
)

Footer.propTypes = {
  copyright: PropTypes.string
}

Footer.defaultProps = {
  copyright: ''
}

export default Footer
