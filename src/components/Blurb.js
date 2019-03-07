import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

import { getColor, applyTag, withoutProps } from '../utils'

const FilteredStyledHeader = applyTag(withoutProps(Header, ['color', 'backgroundColor']))
const StyledHeader = styled(FilteredStyledHeader)`
  ${getColor('primary')}
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
    <Header
      as={StyledHeader}
      tag={tag}
      color={color}
      textAlign='center'
    >
      {header}
    </Header>
    <Header.Content as='p'>{children}</Header.Content>
  </section>
)

Blurb.propTypes = {
  icon: PropTypes.element,
  header: PropTypes.string,
  color: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

Blurb.defaultProps = {
  icon: null,
  header: '',
  color: 'black',
  tag: 'h4',
  className: '',
  children: null
}

export default React.memo(Blurb)
