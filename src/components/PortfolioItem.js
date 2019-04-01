import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  height: 100%;
  object-fit: cover;
`

const PortfolioItem = ({
  title,
  subtitle,
  children,
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
          <S.Image centered as={children.type} {...children.props} />
          <S.Dimmer inverted simple>
            {title && <Header as='h2'>{title}</Header>}
            {subtitle && <Header as='h3'>{subtitle}</Header>}
          </S.Dimmer>
        </S.Dimmable>
      )}
    </Grid.Column>
  )
}

PortfolioItem.propTypes = {
  /** primary content */
  title: PropTypes.node,

  /** secondary content */
  subtitle: PropTypes.node,

  /** image-based content */
  children: PropTypes.element
}

PortfolioItem.defaultProps = {
  title: null,
  subtitle: null,
  children: null
}

export default React.memo(PortfolioItem)
