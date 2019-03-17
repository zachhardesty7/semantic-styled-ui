import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Menu } from 'semantic-ui-react'

import {
  asTag,
  calcDuration,
  media,
  process,
  withoutProps
} from '../utils'

const MenuItemTagged = asTag(withoutProps(Menu.Item, ['pointing']))
const MenuItem = styled(MenuItemTagged)`
  ${media.phone`
    a {
      font-size: 0.97rem;
    }
  `};

  ${({ pointing }) => pointing && css`
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
  `};
`

const NavigationItem = ({
  name,
  tag,
  link,
  stacked,
  pointing,
  className,
  children,
  ...rest
}) => (
  <MenuItem
    name={name || children.toString()}
    tag={tag}
    href={(tag === 'a' && link) || undefined}
    to={(tag !== 'a' && (link.slice(link.indexOf('#') + 1) || `/${process(children.toString())}/`)) || undefined}
    spy={(tag !== 'a' && link.includes('#')) || undefined}
    smooth={(tag !== 'a' && link.includes('#')) || undefined}
    duration={(tag !== 'a' && link.includes('#')) ? calcDuration : undefined}
    {...(tag !== 'a' && !link.includes('#') && !stacked && { activeClassName: 'active' })}
    // REVIEW: if correctness of more verbose option matters
    // {...(!anchor && !stacked ? { activeClassName: 'active' } : {})}
    rel={!link.includes('#') ? 'noopener noreferrer' : undefined}
    target={!link.includes('#') ? '_blank' : undefined}
    pointing={pointing}
    className={className}
    {...rest}
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
  link: PropTypes.string,
  pointing: PropTypes.bool,
  stacked: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

NavigationItem.defaultProps = {
  name: '',
  tag: 'a',
  link: '',
  pointing: false,
  stacked: false,
  className: ''
}

export default React.memo(NavigationItem)
