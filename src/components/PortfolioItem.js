import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
  Dimmer,
  Header,
  Grid
} from 'semantic-ui-react'

import { process } from '../utils'

const Item = styled(Dimmer.Dimmable)`
  height: 100%;
  
  & > .ui.simple.dimmer {
    display: flex;
  }
  
  .content .header {
    color: rgba(0,0,0,.87) !important;
  }

  .profile-image {
    height: 100%;
    object-fit: cover;
  }
`

// TODO: instate for and split from above when not using gatsby
// const PortfolioImage = styled(Image)`
//     height: 100%;
//     object-fit: cover;
// `

const PortfolioItem = ({ piece }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Grid.Column key={process(`${piece.name} ${piece.location}`)}>
      <Item
        // REVIEW: use id not url
        dimmed={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Dimmer inverted simple>
          <Header as='h2'>
            {piece.name}
          </Header>
          <Header as='h3'>
            {piece.location}
          </Header>
        </Dimmer>

        <GImage className='profile-image' centered fluid={piece.image.fluid} />
      </Item>
    </Grid.Column>
  )
}

PortfolioItem.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

PortfolioItem.defaultProps = {
  data: {}
}

export default PortfolioItem
