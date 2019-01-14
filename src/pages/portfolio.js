import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Dimmer,
  Segment,
  Container,
  Header,
  Image,
  Grid
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Template from '../Template'

// cSpell: disable
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
  fiveGuys, scottWhite, speedway,
  fortiline, goodyear, lowes,
  newHope, baylor, esab,
  springs, vincent
]
// cSpell: enable

const PortfolioItem = styled(Dimmer.Dimmable)`
  height: 100%;

  & > .ui.simple.dimmer {
    display: flex;
  }
  
  .content .header {
    color: rgba(0,0,0,.87) !important;
  }
`

const PortfolioImage = styled(Image)`
  height: 100%;
  object-fit: cover;
`

const portfolio = ({ data }) => {
  const [hovered, setHovered] = useState('')

  return (
    <Template>
      <Segment padded vertical basic>
        <Container>
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
                  <PortfolioItem
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

                    <PortfolioImage centered src={image} />
                  </PortfolioItem>
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
