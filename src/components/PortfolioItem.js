import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Dimmer, Grid, Header } from 'semantic-ui-react'

const Item = styled(Dimmer.Dimmable)`
  height: 100%;
`

const DimmerContent = styled(Dimmer)`
  && {
    display: flex;
    
    .content .header {
      color: rgba(0,0,0,.87) !important;
    }
  }
`

const PortfolioImage = styled.img`
  height: 100%;
  object-fit: cover;
`

const PortfolioItem = ({
  title,
  subtitle,
  className,
  children,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Grid.Column className={className} {...rest}>
      {children && (
        <Item
          dimmed={hovered}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <PortfolioImage centered as={children.type} {...children.props} />
          <DimmerContent inverted simple>
            {title && <Header as='h2'>{title}</Header>}
            {subtitle && <Header as='h3'>{subtitle}</Header>}
          </DimmerContent>
        </Item>
      )}
    </Grid.Column>
  )
}

PortfolioItem.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.element
}

PortfolioItem.defaultProps = {
  title: null,
  subtitle: null,
  className: '',
  children: null
}

export default React.memo(PortfolioItem)
