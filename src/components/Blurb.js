import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Header as SUIHeader } from 'semantic-ui-react'

const Header = styled(SUIHeader)`
  color: ${({ headerColor }) => headerColor};
`

const Blurb = ({
  icon,
  header,
  headerAs,
  headerColor,
  content
}) => (
  <div>
    {icon}
    <Header headerColor={headerColor} as={headerAs} textAlign='center'>{header}</Header>
    <Header.Content>{content}</Header.Content>
  </div>
)

Blurb.propTypes = {
  icon: PropTypes.element,
  header: PropTypes.string,
  headerColor: PropTypes.string,
  headerAs: PropTypes.string,
  content: PropTypes.node
}

Blurb.defaultProps = {
  icon: '',
  header: '',
  headerColor: 'black',
  headerAs: 'h4',
  content: ''
}

export default React.memo(Blurb)
