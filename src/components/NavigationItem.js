import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'

import { Menu } from 'semantic-ui-react'

import { utils } from '../utils'

const NavigationItem = ({
  anchor,
  children
}) => {
  const linkType = useMemo(() => (!anchor
    ? import('gatsby')
    : import('react-scroll')), [anchor])

  return (
    <Async
      promise={linkType}
      // spread link from parent to avoid recalculations
      then={({ Link }) => (
        <Menu.Item
          as={Link}
          to={`${utils.process(children.toString())}/`}
          spy={anchor || undefined}
          smooth={anchor || undefined}
          duration={anchor ? utils.calcDuration : undefined}
          tabIndex='0'
          name={children.toString()}
          activeClassName='active'
        >
          {children}
        </Menu.Item>
      )}
    />
  )
}

NavigationItem.propTypes = {
  anchor: PropTypes.bool,
  children: PropTypes.node
}

NavigationItem.defaultProps = {
  anchor: false,
  children: null
}

export default React.memo(NavigationItem)
