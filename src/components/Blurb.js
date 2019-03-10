import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from 'semantic-ui-react'

import { asTag, withoutProps } from '../utils'

const FilteredStyledHeader = asTag(withoutProps(Header, ['color']))
const StyledHeader = styled(FilteredStyledHeader)`
  ${({ color }) => color && `color: ${color}`};
`

const Blurb = ({
  icon,
  header,
  tag,
  color,
  className,
  children
}) => (
  <section className={className}>
    {icon}
    <StyledHeader
      tag={tag}
      color={color}
      textAlign='center'
    >
      {header}
    </StyledHeader>
    <Header.Content as='p'>{children}</Header.Content>
  </section>
)

Blurb.propTypes = {
  icon: PropTypes.node,
  header: PropTypes.node,
  color: PropTypes.string,
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),
  className: PropTypes.string,
  children: PropTypes.node
}

Blurb.defaultProps = {
  icon: null,
  header: null,
  color: '',
  tag: 'h4',
  className: '',
  children: null
}

export default React.memo(Blurb)
