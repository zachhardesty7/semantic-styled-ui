import React from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

// user-defined
import './index.scss'

import {
  Segment,
  Container,
  Header,
  Image,
  Grid
} from 'semantic-ui-react'

import Template from '../templates'
import './portfolio.scss'

import baylor from '../../static/baylor.jpg'
import esab from '../../static/esab.jpg'
import fiveGuys from '../../static/five-guys.jpg'
import fortiline from '../../static/fortiline.jpg'
import goodyear from '../../static/goodyear.jpg'
import lowes from '../../static/lowes.jpg'
import newHope from '../../static/new-hope.jpg'
import scottWhite from '../../static/scott-white.png'
import speedway from '../../static/speedway.jpg'
import springs from '../../static/springs.jpg'
import vincent from '../../static/vincent.jpg'

const images = [baylor, esab, fiveGuys, fortiline, goodyear, lowes, newHope, scottWhite, speedway, springs, vincent]

const portfolio = ({ data }) => (
  <Template>
    <Segment padded vertical basic>
      <Container text>
        <Header as='h1'>Our Work</Header>
        {/* <Header.Content>ETC</Header.Content> */}
      </Container>
    </Segment>
    <Segment padded vertical basic>
      <Container text>
        <Grid textAlign='center' columns={3}>
          {images.map(image => (
            <Grid.Column>
              <Image className='portfolio-image' src={image} />
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </Segment>
  </Template>
)

portfolio.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

portfolio.defaultProps = {
  data: {}
}

export default portfolio
