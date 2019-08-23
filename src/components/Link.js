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
	forwarded = false,
	children,
	...rest
}) => {
	const isAnchor = as !== 'a' && link.includes('#')
	const isExternal = as === 'a' && !link.includes('#')

	return (
		React.Children.map(children, (Child) => {
			if (!Child) return false // prevent wrapping empty elements

			const props = {
				href: (as === 'a' && link) || undefined,
				// remove "#" or get dest from children text
				to: (as !== 'a' && (link.slice(link.indexOf('#') + 1) || `/${process(Child?.props?.children?.toString())}/`)) || undefined,
				spy: isAnchor || undefined,
				smooth: isAnchor || undefined,
				duration: isAnchor ? calcDuration : undefined,
				rel: isExternal ? 'noopener noreferrer' : undefined,
				target: isExternal ? '_blank' : undefined,
				...rest, // does not include `as`
			}

			const Tag = as

			if (wrap) return <Tag {...props}>{Child}</Tag>
			if (forwarded) return withNewProps(Child, { ...props, forwardedAs: as })
			return withNewProps(Child, { ...props, as })
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

	/** when not wrapping, convert `as` tag to `forwardedAs` for `styled-components` */
	forwarded: PropTypes.bool,

	/** primary content, usually string, used as link if link not provided */
	children: PropTypes.node.isRequired,
}

/* @component */
export default React.memo(Link)
