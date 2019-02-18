import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from 'semantic-ui-react'

import { utils } from '../utils'

// TODO: inherit as prop from parent
const NavigationItem = ({
  as,
  anchor,
  children
}) => (
  <Menu.Item
    as={as}
    to={`/${utils.process(children.toString())}/`}
    spy={anchor || undefined}
    smooth={anchor || undefined}
    duration={anchor ? utils.calcDuration : undefined}
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
