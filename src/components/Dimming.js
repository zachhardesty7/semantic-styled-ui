import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Dimmer, Grid, Header } from 'semantic-ui-react'

const S = {} // styled-components namespace

S.Dimmable = styled(Dimmer.Dimmable)`
  height: 100%;
`

S.Dimmer = styled(Dimmer)`
  display: flex;
  
  .content .header {
    color: rgba(0,0,0,.87);
  }
`

S.Image = styled.img`
  ${({ fill }) => (
    fill ? (`
      height: 100%;
      object-fit: cover;
    `) : (`
      top: 50%;
      transform: translateY(-50%);
    `)
  )};
`

const Dimming = ({
  trigger,
  children = null,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Grid.Column {...rest}>
      {children && (
        <S.Dimmable
          dimmed={hovered}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* REVIEW: consider a dimmable prop to use dimmer
          conditionally or that wraps the image using a HOC */}
          {trigger}
          {children && (
            <S.Dimmer inverted simple>
              {title && <Header as='h2'>{title}</Header>}
              {subtitle && <Header as='h3'>{subtitle}</Header>}
            </S.Dimmer>
          )}
        </S.Dimmable>
      )}
    </Grid.Column>
  )
}

Dimming.propTypes = {
  /** hovering over this activates dimmer */
  trigger: PropTypes.element,

  /** nodes displayed within dimmer */
  children: PropTypes.node
}

export default React.memo(Dimming)
