import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { withNewProps } from '../utils'

const paddingTable = {
	compact: '0.5em',
	tight: '1em',
	base: '2em',
	relaxed: '4em',
	loose: '6em',
}

const S = {} // styled-components namespace

S.Groups = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  
  ${({ padded, padding }) => (
		(padded === 'top' && `padding-top: ${paddingTable[padding]}`) ||
    (padded === 'bottom' && `padding-bottom: ${paddingTable[padding]}`) ||
    (padded && `padding: ${paddingTable[padding]} 0`)
	)};
`

S.Group = styled.div`
  display: flex;
  margin: 0;
  padding: 0 0.5em;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`

const IconGroup = ({
	justify = 'initial',
	padded = false,
	padding = 'tight',
	className = '',
	children,
	...rest
}) => (
	<S.Groups
		justify={justify}
		padded={padded}
		padding={padding}
		className={className}
	>
		{React.Children.map(children, Child => (
			<S.Group>
				{withNewProps(Child, rest)}
			</S.Group>
		))}
	</S.Groups>
)

IconGroup.propTypes = {
	/** flex alignment of icon container */
	justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),

	/** spacing around element exists */
	padded: PropTypes.oneOf([false, true, 'top', 'bottom', 'both']),

	/** control amount of spacing around element */
	padding: PropTypes.oneOf(['compact', 'tight', 'base', 'relaxed', 'loose']),

	/** additional or pass thru classes for composition */
	className: PropTypes.string,

	/** primary content of icon(s) */
	children: PropTypes.node.isRequired,
}

export default React.memo(IconGroup)
