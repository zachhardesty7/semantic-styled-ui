import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from 'semantic-ui-react'

import { calcDuration, process } from '../utils'

const NavigationItem = ({
  name,
  tag,
  to,
  anchor,
  stacked,
  className,
  children
}) => (
  <Menu.Item
    name={name || children.toString()}
    as={tag}
    to={to || `/${process(children.toString())}/`}
    spy={anchor || undefined}
    smooth={anchor || undefined}
    duration={anchor ? calcDuration : undefined}
    {...(!anchor && !stacked && { activeClassName: 'active' })}
    // REVIEW: if correctness of more verbose option matters
    // {...(!anchor && !stacked ? { activeClassName: 'active' } : {})}
    className={className}
  >
    {children}
  </Menu.Item>
)

NavigationItem.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  to: PropTypes.string,
  anchor: PropTypes.bool,
  stacked: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

NavigationItem.defaultProps = {
  name: '',
  tag: 'a',
  to: '',
  anchor: false,
  stacked: false,
  className: ''
}

export default React.memo(NavigationItem)
