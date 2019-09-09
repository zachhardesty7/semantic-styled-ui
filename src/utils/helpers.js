import React from 'react'

/**
 * Capitalize first letter of words and remove spaces.
 *
 * @param {string} str - arbitrary input
 * @returns {string} parsed into title-case with spaces removed
 * @example
 *
 * toJoinedTitleCase('an arbitrary string input')
 * // => 'AnArbitraryStringInput'
 */
export const toJoinedTitleCase = (str = '') => (
	str.replace(
		/\w*/g,
		txt => txt.charAt(0).toUpperCase() + txt.substr(1)
	).replace(/\W/g, '')
)

/**
 * Clamp duration of scrolling.
 *
 * Used for smooth scrolling when clicking anchor link
 * with `react-scroll` plugin, duration increases with dist.
 *
 * @requires `react-scroll`
 * @param {number} scrollDistanceInPx - distance of element from viewport
 * @returns {number} ms equal to scroll distance capped at upper and lower bounds of 800 & 2000
 */
export const calcDuration = (scrollDistanceInPx) => {
	const min = 800
	const max = 2000

	return Math.min(Math.max(Math.abs(scrollDistanceInPx), min), max)
}

/**
 * Lowercase and replace spaces with dashes.
 *
 * @param {string} str - arbitrary input
 * @returns {string} parsed output
 * @example
 *
 * process('An Arbitrary String Input')
 * // => 'an-arbitrary-string-input'
 */
export const process = (str = '') => str.toLowerCase().replace(/\W/g, '-')

/**
 * Convert camel case string to kebab case.
 *
 * @param {string} str - arbitrary input
 * @returns {string} parsed output
 * @example
 *
 * camelCaseToDash('userId')
 * // => 'user-id'
 * camelCaseToDash('waitAMoment')
 * // => 'wait-a-moment'
 * camelCaseToDash('TurboPascal')
 * // => 'turbo-pascal'
 */
export const camelToKebab = (str = '') => str.replace(/([A-Za-z])(?=[A-Z])/g, '$1-').toLowerCase()

/**
 * URL encodes the data of key, value pairs as submitted by a form.
 *
 * @param {Record<string, string>} data - arbitrary form data
 * @returns {string} URL encoded data
 * @example
 *
 * encode({ key1: 'val1', key2: 'val2' })
 * // => 'key1=val1&key2=val2'
 */
export const encode = data => Object.entries(data)
	.map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
	.join('&')

/**
 * Soft merge new props into a React Component without
 * overwriting the original props (preserves immutability).
 *
 * @param {React.ReactElement<P>} [element] - instance target to receive new props
 * @param {Record<string, any>} props - object of new props
 * @returns {false | React.ReactElement<P & P2>} cloned React Element with shallowly merged props
 * @requires `react`
 * @template P - props obj of input Element
 * @template P2 - props obj to merge
 * @example
 *
 * withNewProps(<Container prop0='val0' />, { prop1: 'val1', prop2: 'val2' })
 * // => <Container prop0='val0' prop1='val1' prop2='val2' />
 * withNewProps(<Container prop3='important-value' />, { prop3: 'val3', prop4: 'val4' })
 * // => <Container prop3='important-value' prop4='val4' />
 *
 */
export const withNewProps = (element, props = {}) => (
	element && React.cloneElement(element, { ...props, ...element.props })
)

/**
 * helper function to find and return semantic name used for debugging components
 *
 * @param {object} target - usually a react element
 * @param {string} [target.displayName] - manually defined name for debug
 * @param {string} [target.name] - generally assigned via React from var name
 * @returns {string} best "name" of element
 */
const getComponentName = ({ displayName, name }) => displayName || name || 'Component'

/**
 * Dynamically prevent props from reaching DOM elements
 * by providing styled-components a prop blacklist. Most
 * useful to prevent props intended for a styled component
 * from getting picked up by the {...rest} of the base component.
 *
 * Technical: closes over input Component and coerces rendered EnhancedComponent element
 * to Component.type.
 *
 * @param {React.ElementType<P>} Component - target to control props of
 * @param {PK} propKeys - array of prop keys to control
 * @returns {(props: React.PropsWithChildren<P>, ref: React.Ref<T>) => React.ReactElement<Omit<P, PK>, T>} ref forwarding function that removes unwanted `propKeys` from original props
 * @requires `react` && usually `styled-components`
 * @see https://www.styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
 * @todo check out making curried like this: https://codesandbox.io/s/l50mlwqo1q
 * @template {{}} P - props from run-time inner calling component
 * @template {string} T - type of run-time inner calling component
 * @template {string[]} PK - type of run-time inner calling component
 * @example
 *
 * const ContainerWithPassThrough = ({ className, ...rest }) => (
 *  <div className={className} {...rest} />
 * )
 *
 * const FilteredContainer = withoutProps(ContainerWithPassThrough, ['color'])
 * const Container = styled(FilteredContainer)`
 *  color: ${({ color }) => color};
 * `
 *
 * const Component = ({ color }) => (
 *  <Container
 *    color={color}
 *    className='con'
 *  />
 * )
 *
 * <Component color='blue' />
 * // => <div className='con' /> // with a blue color
 */
export const withoutProps = (Component, propKeys = []) => {
	// facilitate debugging with named func
	const FilteredComponent = ({ children, ...rest }, ref) => {
		const filtered = Object.fromEntries(Object.entries(rest)
			.filter(([key]) => !propKeys.includes(key)))

		return <Component ref={ref} {...filtered}>{children}</Component>
	}

	// attach "FilteredProps" tag in React Dev Tools v5
	FilteredComponent.displayName = `FilteredProps(${getComponentName(Component)})`

	// ensure ref points to Element NOT functional FilteredComponent
	const result = React.forwardRef(FilteredComponent)
	result.name = Component.name // pass thru original name tags

	return result
}

// TODO: come up with method to prevent creating an additional element in DevTools v5
// export const withoutPropsImpure = (Component, propKeys = []) => {
// 	// facilitate debugging with named func
// 	const OldComponent = Component
// 	Component.apply()
// 	Component = ({ children, ...rest }) => {
// 		const filteredProps = Object.fromEntries(Object.entries(rest)
// 			.filter(([key]) => !propKeys.includes(key)))

// 		return <OldComponent {...filtered}>{children}</OldComponent>
// 	}

// 	// ensure ref points to Component NOT functional FilteredPropsComponent
// 	return Component.bind(this, )
// }

// helpful for testing
export const sleep = ms => data => new Promise(resolve => setTimeout(() => resolve(data), ms))
