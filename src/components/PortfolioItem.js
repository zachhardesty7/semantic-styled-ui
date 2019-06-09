import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Dimmer, Grid, Header } from 'semantic-ui-react'

const S = {} // styled-components namespace

S.Dimmable = styled(Dimmer.Dimmable)`
  width: fit-content;
  height: 100%;
`

S.Dimmer = styled(Dimmer)`
  ${({ dimmed }) => !dimmed && 'visibility: hidden'};
  display: flex;
  
  .content .header {
    color: rgba(0,0,0,.87);
  }
`

S.Image = styled.img`
  ${({ fill }) => (
    fill ? (
      css`
        height: 100%;
        object-fit: cover;
      `
    ) : (
      css`
        top: 50%;
        transform: translateY(-50%);
        position: relative;
      `
    )
  )};
`

const PortfolioItem = ({
  title = '',
  subtitle = '',
  fill = true,
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
          <S.Image fill={fill} centered as={children.type} {...children.props} />
          {(title || subtitle) && (
            <S.Dimmer inverted simple dimmed={hovered || undefined}>
              {title && <Header as='h2'>{title}</Header>}
              {subtitle && <Header as='h3'>{subtitle}</Header>}
            </S.Dimmer>
          )}
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

  /** determine when to cover the entire space with hidden overflow */
  fill: PropTypes.bool,

  /** image-based content */
  children: PropTypes.element
}

export default React.memo(PortfolioItem)
