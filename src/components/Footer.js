import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'

import SocialMediaIcons from './SocialMediaIcons'
import './Footer.scss'


const Footer = ({
  copyright,
  inverted,
  icons,
  developerName,
  developerLink
}) => (
  <Segment inverted vertical id='bottom-bar'>
    <Container>
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column id='attribution' width={12}>
          {`copyright© ${copyright} | designed and developed by `}
          <a href={developerLink}>{developerName}</a>
        </Grid.Column>
        <Grid.Column width={4} id='bottom-bar-icons' floated='right' textAlign='right'>
          <SocialMediaIcons
            inverted={inverted}
            icons={icons}
          />
        </Grid.Column>
      </Grid>
    </Container>
  </Segment>
)

Footer.propTypes = {
  developerName: PropTypes.string,
  developerLink: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  inverted: PropTypes.bool,
  copyright: PropTypes.string
}

Footer.defaultProps = {
  developerName: '',
  developerLink: '',
  icons: [],
  inverted: false,
  copyright: ''
}

export default Footer
