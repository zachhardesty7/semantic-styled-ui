import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container, Menu, Segment } from 'semantic-ui-react'
import NavigationItem from '../NavigationItem'
import NavigationLogo from '../NavigationLogo'

import { withNewProps, withoutProps } from '../../utils'

const S = {} // styled-components namespace

const SegmentFiltered = withoutProps(Segment, ['pointing'])
S.Segment = styled(SegmentFiltered)`
  ${({ pointing }) => pointing && 'padding-bottom: 0'};
`

S.Menu = styled(Menu)`
  flex-wrap: wrap;
  justify-content: center;

  ${({ pointing }) => pointing && 'border-bottom: none'};
  ${({ pointing }) => pointing && 'margin-bottom: 2px'};
`

// TODO: add sticky header
const Navigation = ({
	as = 'a',
	size = undefined,
	text = false,
	compact = true,
	secondary = true,
	pointing = true,
	centered = true,
	children = null,
	...rest
}) => (
	<S.Segment
		forwardedAs='header'
		pointing={pointing}
		basic
		vertical
		{...rest}
	>
		<Container textAlign={centered ? 'center' : undefined}>
			<S.Menu
				forwardedAs='nav'
				size={size}
				text={text}
				compact={compact}
				secondary={secondary}
				pointing={pointing}
			>
				{/* apply tag && pointing to all children */}
				{React.Children.map(children, Child => withNewProps(Child, { as, pointing }))}
			</S.Menu>
		</Container>
	</S.Segment>
)

Navigation.propTypes = {
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

	/** size using "em" units */
	size: PropTypes.oneOf(['small', 'tiny', 'mini', 'large', 'huge', 'massive']),

	/** format to be used with text items */
	text: PropTypes.bool,

	/** reduce whitespace */
	compact: PropTypes.bool,

	/** reduce prominence */
	secondary: PropTypes.bool,

	/** indicate active page */
	pointing: PropTypes.bool,

	/** horizontal position */
	centered: PropTypes.bool,

	/** collection of items to render as menu */
	children: PropTypes.node,
}

const NavigationMemo = React.memo(Navigation)
NavigationMemo.Item = NavigationItem
NavigationMemo.Logo = NavigationLogo

export default NavigationMemo
