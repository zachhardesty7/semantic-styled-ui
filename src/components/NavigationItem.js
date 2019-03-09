import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Menu } from 'semantic-ui-react'

import {
  applyTag,
  calcDuration,
  media,
  process,
  withoutProps
} from '../utils'

const MenuItemTagged = applyTag(withoutProps(Menu.Item, ['pointing']))
const MenuItem = styled(MenuItemTagged)`
  ${media.phone`
    a {
      font-size: 0.97rem;
    }
  `}

  ${({ pointing }) => pointing && css`
    &&& {
      border-bottom: 2px solid rgba(34,36,38,.15);

      &.active {
        border-bottom: 2px solid #1b1c1d;
      }

      /* remove rounded edge that distorts underline */
      &:last-child {
        border-radius: 0;
      }

      /* mix primary menu w secondary menu style */
      &:hover {
        background-color: rgba(0,0,0,.05);
      }
    }
  `}
`

const NavigationItem = ({
  name,
  tag,
  to,
  anchor,
  stacked,
  pointing,
  className,
  children
}) => (
  <MenuItem
    name={name || children.toString()}
    tag={tag}
    to={to || `/${process(children.toString())}/`}
    spy={anchor || undefined}
    smooth={anchor || undefined}
    duration={anchor ? calcDuration : undefined}
    {...(!anchor && !stacked && { activeClassName: 'active' })}
    // REVIEW: if correctness of more verbose option matters
    // {...(!anchor && !stacked ? { activeClassName: 'active' } : {})}
    pointing={pointing}
    className={className}
  >
    {children}
  </MenuItem>
)

NavigationItem.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),
  to: PropTypes.string,
  anchor: PropTypes.bool,
  pointing: PropTypes.bool,
  stacked: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

NavigationItem.defaultProps = {
  name: '',
  tag: 'a',
  to: '',
  anchor: false,
  pointing: false,
  stacked: false,
  className: ''
}

export default React.memo(NavigationItem)
