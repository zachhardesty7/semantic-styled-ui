import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

import { asTag, withoutProps } from '../utils'

const S = {} // styled-components namespace

const FilteredHeader = asTag(withoutProps(Header, ['color']))
S.Header = styled(FilteredHeader)`
  color: ${({ color }) => color};
  font-size: 2em;
`

const Blurb = ({
  icon,
  header,
  tag = 'h4',
  color = '',
  children,
  ...rest
}) => (
  <section {...rest}>
    {icon}
    <S.Header
      tag={tag}
      color={color}
    >
      {header}
    </S.Header>
    <Header.Content>{children}</Header.Content>
  </section>
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
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),

  /** secondary content of body */
  children: PropTypes.node
}

export default React.memo(Blurb)
