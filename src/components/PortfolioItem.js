import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GImage from 'gatsby-image'

import styled from 'styled-components'
import {
  Dimmer,
  Header,
  Grid
} from 'semantic-ui-react'

const Item = styled(Dimmer.Dimmable)`
  height: 100%;
`

const DimmerContent = styled(Dimmer)`
  display: flex;
  
  .content .header {
    color: rgba(0,0,0,.87) !important;
  }
`

const PortfolioImage = styled(GImage)`
    height: 100%;
    object-fit: cover;
`

const PortfolioItem = ({ piece }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Grid.Column>
      <Item
        dimmed={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <DimmerContent inverted simple>
          <Header as='h2'>
            {piece.name}
          </Header>
          <Header as='h3'>
            {piece.location}
          </Header>
        </DimmerContent>

        <PortfolioImage className='profile-image' centered fluid={piece.image.fluid} />
      </Item>
    </Grid.Column>
  )
}

PortfolioItem.propTypes = {
  piece: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

PortfolioItem.defaultProps = {
  piece: {}
}

export default PortfolioItem
