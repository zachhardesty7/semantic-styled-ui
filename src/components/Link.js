import React from 'react'
import PropTypes from 'prop-types'

import {
	calcDuration,
	process,
	withNewProps,
} from '../utils'

const Link = ({
	as = 'a',
	link = '',
	wrap = false,
	children,
	...rest
}) => {
	const isAnchor = as !== 'a' && link.includes('#')
	const isExternal = as === 'a' && !link.includes('#')

	return (
		React.Children.map(children, (Child) => {
			const props = {
				href: (as === 'a' && link) || undefined,
				// remove "#" or get dest from children text
				to: (as !== 'a' && (link.slice(link.indexOf('#') + 1) || `/${process(Child?.props?.children?.toString())}/`)) || undefined,
				spy: isAnchor || undefined,
				smooth: isAnchor || undefined,
				duration: isAnchor ? calcDuration : undefined,
				rel: isExternal ? 'noopener noreferrer' : undefined,
				target: isExternal ? '_blank' : undefined,
				...rest,
			}

			const Tag = as

			return wrap
				? <Tag {...props}>{Child}</Tag>
				: withNewProps(Child, { ...props, forwardedAs: as })
		})
	)
}

Link.propTypes = {
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

	/**
  * anchor link (prefixed with "#") or standard href, uses child content
  * if not provided and using an a tag
  */
	link: PropTypes.string,

	/** render as enclosing tag */
	wrap: PropTypes.bool,

	/** primary content, usually string, used as link if link not provided */
	children: PropTypes.node.isRequired,
}

/* @component */
export default React.memo(Link)
