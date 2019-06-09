import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

import { withNewProps, withoutProps } from '../utils'

const S = {} // styled-components namespace

S.Section = styled.section`
  text-align: ${({ align }) => align};
`

const FilteredHeader = withoutProps(Header, ['color'])
S.Header = styled(FilteredHeader)`
  color: ${({ color }) => color};
  font-size: 2em;
`

const Blurb = ({
  as = 'h4',
  icon,
  align = 'center',
  header,
  color = '',
  children,
  ...rest
}) => (
  <S.Section align={align} {...rest}>
    {withNewProps(icon, { align })}
    <S.Header
      forwardedAs={as}
      color={color}
    >
      {header}
    </S.Header>
    <Header.Content>{children}</Header.Content>
  </S.Section>
)

Blurb.propTypes = {
  /** content above header */
  icon: PropTypes.node,

  /** primary content (styled as text) */
  header: PropTypes.node,

  /** apply css supported color string to Header text, overrides theme / default */
  color: PropTypes.string,

  /**
  * element type to render `header` as (string or function)
  *
  * supports HTML tag as a string or React component definition
  *
  * @example
  *
  * 'div'
  * 'section'
  * {ReactComponent}
  * Card
  */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),

  /** position / justification of all content */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /** secondary content of body */
  children: PropTypes.node
}

export default React.memo(Blurb)
