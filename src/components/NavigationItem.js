import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from 'semantic-ui-react'

import { calcDuration, process } from '../utils'

// TODO: inherit 'as' prop from parent
const NavigationItem = ({
  as,
  anchor,
  children
}) => (
  <Menu.Item
    as={as}
    to={`/${process(children.toString())}/`}
    spy={anchor || undefined}
    smooth={anchor || undefined}
    duration={anchor ? calcDuration : undefined}
    tabIndex='0'
    name={children.toString()}
    activeClassName='active'
  >
    {children}
  </Menu.Item>
)

NavigationItem.propTypes = {
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  anchor: PropTypes.bool,
  children: PropTypes.node
}

NavigationItem.defaultProps = {
  as: 'div',
  anchor: false,
  children: null
}

export default React.memo(NavigationItem)
