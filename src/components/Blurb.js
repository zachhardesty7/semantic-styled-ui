import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

import { getColor } from '../utils'

const StyledHeader = styled(Header).attrs(({ textColor, headerAs }) => ({ color: textColor, as: headerAs }))`
  ${getColor('primary')}
`

const Blurb = ({
  icon,
  header,
  headerAs,
  headerColor,
  children
}) => (
  <section>
    {icon}
    {/* NOTE: 'color' prop is already used by SUI, avoid collision with 'textColor' */}
    <Header
      as={StyledHeader}
      headerAs={headerAs}
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
  headerAs: PropTypes.string,
  children: PropTypes.node
}

Blurb.defaultProps = {
  icon: null,
  header: '',
  headerColor: 'black',
  headerAs: 'h4',
  children: null
}

export default React.memo(Blurb)
