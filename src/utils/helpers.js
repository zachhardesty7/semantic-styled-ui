/* eslint-disable react/no-multi-comp */
import React from 'react'
import { ObjectFromEntries } from './shims'

/**
 * capitalize first letter of words and remove spaces
 *
 * @param {string} str arbitrary input
 * @returns {string} parsed into title-case with spaces removed
 * @example
 *
 * toJoinedTitleCase('an arbitrary string input')
 * // => 'AnArbitraryStringInput'
 */
export const toJoinedTitleCase = str => (
  str.replace(
    /\w*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1)
  ).replace(/\W/g, '')
)

/**
 * clamp duration of scrolling
 *
 * used for smooth scrolling when clicking anchor link
 * with `react-scroll` plugin, duration increases with dist
 *
 * @requires `react-scroll`
 * @param {number} scrollDistanceInPx distance of element from viewport
 * @returns {number} ms equal to scroll distance capped at upper and lower bounds of 800 & 2000
 */
export const calcDuration = (scrollDistanceInPx) => {
  const min = 800
  const max = 2000

  return Math.min(Math.max(Math.abs(scrollDistanceInPx), min), max)
}

/**
 * lowercase and replaces spaces with dashes
 *
 * @param {string} str arbitrary input
 * @returns {string} parsed output
 * @example
 *
 * process('An Arbitrary String Input')
 * // => 'an-arbitrary-string-input'
 */
export const process = str => str.toLowerCase().replace(/\W/g, '-')

/**
 * convert camel case string to kebab case
 *
 * @param {string} str arbitrary input
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
export const camelToKebab = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()

/**
 * URL encodes the data of key, value pairs as submitted by a form
 *
 * @param {{ [field: string]: string }} data arbitrary form data
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
 * soft merge new props into a React Component without
 * overwriting the original props (preserves immutability)
 *
 * @param {React.ReactElement<P, T>} element instance target to receive new props
 * @param props object of new props
 * @returns {React.ReactElement<P, any>} cloned React Element with shallowly merged props
 * @requires `react`
 * @template {{}} P - props obj of input Element
 * @template {string} T - type of input Element
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
 * dynamically prevent props from reaching DOM elements
 * by providing styled-components a prop blacklist, most
 * useful to prevent props intended for a styled component
 * from getting picked up by the {...rest} of the base component.
 *
 * technical: closes over input Component and coerces rendered EnhancedComponent element
 * to Component.type
 *
 * @param {React.ElementType<any>} Component target to control rendering tag
 * @param {string[]} propKeys array of prop keys to control
 * @returns {(props: React.PropsWithChildren<P>, ref: React.Ref<any>) => React.ReactElement<P, any>}
 * ref forwarding function that removes unwanted `propKeys` from original props
 * @requires `react` && usually `styled-components`
 * @see https://www.styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
 * @TODO check out making curried like this: https://codesandbox.io/s/l50mlwqo1q
 * @template {{}} P - props from run-time inner calling component
 * @example
 * ```
 * // don't include asterisks
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
 * ```
 */
export const withoutProps = (Component, propKeys = []) => {
  // facilitate debugging with named func
  const EnhancedComponent = ({ children, ...rest }, ref) => {
    const filtered = Object.fromEntries(Object.entries(rest)
      .filter(([key]) => !propKeys.includes(key)))

    return <Component ref={ref} {...filtered}>{children}</Component>
  }

  // ensure ref points to Component NOT functional EnhancedComponent
  return React.forwardRef(EnhancedComponent)
}

/**
 * convert the "tag" prop to the "as" prop without overwriting
 * styled-components behavior while forwarding React Ref,
 * most useful when base component already uses the "as" tag
 * to dynamically control component rendering tag
 *
 * technical: closes over input Component and coerces rendered EnhancedComponent element
 * to Component.type
 *
 * @param {React.ElementType<any>} Component target to control rendering tag
 * @returns {(props: React.PropsWithChildren<P>, ref: React.Ref<any>) => React.ReactElement<P, any>}
 * a function to pass ref and convert "tag" to "as"
 * @requires `react` && usually `styled-components`
 * @template {{}} P - props from run-time inner calling component
 * @example
 *
 * ```
 * // don't include asterisks
 * const ContainerWithAsRendering = ({ as }) => React.createElement(as)
 *
 * const TaggedContainer = asTag(ContainerWithAsRendering)
 * const Container = styled(TaggedContainer)``
 *
 * const Component = ({ tag }) => <Container tag={tag} />
 *
 * <Component tag='section' />
 * // => <section />
 * ```
 */
export const asTag = (Component) => {
  // const ComponentType = Component

  // facilitate debugging with named func
  const EnhancedComponent = ({ tag, children, ...rest }, ref) => (
    <Component as={tag} ref={ref} {...rest}>{children}</Component>
  )

  // ensure ref points to Component NOT functional EnhancedComponent
  return React.forwardRef(EnhancedComponent)
}

// helpful for testing
export const sleep = ms => data => new Promise(resolve => setTimeout(() => resolve(data), ms))
