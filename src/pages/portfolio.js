import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css'

import {
  Dimmer,
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

const images = [
  baylor, esab, fiveGuys,
  fortiline, goodyear, lowes,
  newHope, scottWhite, speedway,
  springs, vincent
]

const portfolio = ({ data }) => {
  const [hovered, setHovered] = useState('')

  return (
    <Template className='portfolio'>
      <Segment padded vertical basic>
        <Container text>
          <Header as='h1'>Our Work</Header>
          {/* <Header.Content>description</Header.Content> */}
        </Container>
        <Segment padded vertical basic>
          <Container>
            <Grid
              textAlign='center'
              columns={3}
              stackable
            >
              {images.map(image => (
                <Grid.Column>
                  <Dimmer.Dimmable
                    className='portfolio-item'
                    // REVIEW: use id not url
                    dimmed={image === hovered}
                    onMouseEnter={() => setHovered(image)}
                    onMouseLeave={() => setHovered('')}
                  >
                    <Dimmer inverted simple>
                      <Header as='h2'>
                      Speedway Commerce Center
                      </Header>
                      <Header as='h3'>
                      Charlotte Motor Speedway, Concord, NC
                      </Header>
                    </Dimmer>

                    <Image centered className='portfolio-image' src={image} />
                  </Dimmer.Dimmable>
                </Grid.Column>
              ))}
            </Grid>
          </Container>
        </Segment>
      </Segment>
    </Template>
  )
}

portfolio.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

portfolio.defaultProps = {
  data: {}
}

export default portfolio
