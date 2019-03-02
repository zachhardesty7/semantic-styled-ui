import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

import { getColor } from '../utils'

const StyledHeader = styled(Header).attrs(({ textColor, tag }) => ({ color: textColor, as: tag }))`
  ${getColor('primary')}
`

const Blurb = ({
  icon,
  header,
  tag,
  headerColor,
  children
}) => (
  <section>
    {icon}
    {/* NOTE: 'color' prop is already used by SUI, avoid collision with 'textColor' */}
    <Header
      as={StyledHeader}
      tag={tag}
      textColor={headerColor}
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
  headerColor: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node
}

Blurb.defaultProps = {
  icon: null,
  header: '',
  headerColor: 'black',
  tag: 'h4',
  children: null
}

export default React.memo(Blurb)
