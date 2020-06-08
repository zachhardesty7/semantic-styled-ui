import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

const S = {} // styled-components namespace

S.Title = styled(Header)`
  font-size: 3rem;
`

// TODO: test mobile, may need `container` on `Grid`
export const Title = ({
  as = 'h2',
  subtitle = '',
  textAlign = 'center',
  children,
  ...rest
}) => (children || subtitle) && (
  <Header text {...rest}>
    {children && (
      <S.Title forwardedAs={as}>{children}</S.Title>
    )}
    {subtitle && (
      <Header.Content>{subtitle}</Header.Content>
    )}
  </Header>
)

Title.propTypes = {
  /** main title message */
  children: PropTypes.node,

  /** what the main message is rendered as */
  as: PropTypes.node,

  /** subtitle message */
  subtitle: PropTypes.node,

  /** format body content */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

}
