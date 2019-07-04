import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Menu } from 'semantic-ui-react'

import Link from './Link'

import { media, withoutProps } from '../utils'

const S = {} // styled-components namespace

const FilteredItem = withoutProps(Menu.Item, ['pointing'])
S.Item = styled(FilteredItem)`
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

  /* REVIEW: report bug when placing this block before the prev */
  @media ${media.phone} {
    a {
      font-size: 0.97rem;
    }
  }
`

const NavigationItem = ({
	as = 'a',
	link = '',
	stacked = false,
	pointing = false,
	children,
	...rest
}) => (
	<Link
		onClick={e => e.currentTarget.blur()} // prevent keeping focus after navigating to new page
		as={as}
		link={link}
		activeClassName={(as !== 'a' && !link.includes('#') && !stacked) ? 'active' : undefined}
		{...rest}
	>
		<S.Item pointing={pointing}>
			{children}
		</S.Item>
	</Link>
)

NavigationItem.propTypes = {
	/**
  * element type to render as (string or function)
  * supports HTML tag as a string or React component definition
  *
  * @example
  *
  * 'div'
  * 'section'
  * ReactComponent
  * Card
  */
	as: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.elementType,
	]),

	/** anchor link (prefixed with "#") or standard href */
	link: PropTypes.string,

	/** formatted with active indicator */
	pointing: PropTypes.bool,

	/** required to support stacking logo */
	stacked: PropTypes.bool,

	/** primary content, usually string, used as link if link not provided */
	children: PropTypes.node.isRequired,
}

export default React.memo(NavigationItem)
