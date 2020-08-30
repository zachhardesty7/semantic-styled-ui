import React from "react"

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
export const toJoinedTitleCase = (str = "") =>
  str
    .replace(/\w*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
    .replace(/\W/g, "")

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
export const process = (str = "") => str.toLowerCase().replace(/\W/g, "-")

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
export const camelToKebab = (str = "") =>
  str.replace(/([A-Za-z])(?=[A-Z])/g, "$1-").toLowerCase()

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
export const encode = (data) =>
  Object.entries(data)
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join("&")

/**
 * identical to `.includes()` on `String.prototype` or `Array.prototype` but accepts multiple terms
 *
 * @param {string | any[]} con - anything that has an `include()` method on its prototype
 * @param {any[]} searchVals - targets to check for presence in `con`
 * @returns {boolean} true if any of the `searchVals` are included in the `con`
 * @example
 *
 * includesAny("paddingTop", ["padding", "margin"])
 * // => true
 * includesAny(["paddingTop"], ["padding", "margin"])
 * // => false
 */
export const includesAny = (con, searchVals = []) =>
  searchVals.some((searchVal) => con.includes(searchVal))

/**
 * creates a new obj without any keys that were declared as undefined on the input obj
 *
 * @param {any} obj - arbitrary object
 * @returns {string} input object without `undefined` property keys
 * @example
 *
 * removeUndef({ key1: 'val1', key2: undefined })
 * // => {key1: 'val1'}
 */
const removeUndef = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter((kv) => kv[1] != null && kv[1] !== undefined)
  )

/**
 * Soft merge new props into a React Component without
 * overwriting the original props (preserves immutability).
 *
 * @param {React.ReactElement<P>} [element] - instance target to receive new props
 * @param {{}} [props] - object of new props
 * @returns {false | React.ReactElement<Intersect<P, props>>} cloned React Element with shallowly merged props
 * @requires `react`
 * @template {{}} P - props obj
 * @example
 *
 * withNewProps(<Container prop0='val0' />, { prop1: 'val1', prop2: 'val2' })
 * // => <Container prop0='val0' prop1='val1' prop2='val2' />
 * withNewProps(<Container prop3='important-value' />, { prop3: 'val3', prop4: 'val4' })
 * // => <Container prop3='important-value' prop4='val4' />
 *
 */
export const withNewProps = (element, props = {}) =>
  element &&
  React.cloneElement(element, { ...removeUndef(props), ...element.props })

/**
 * **hard** merge new props into a React Component and overwrite the original props.
 *
 * @param {React.ReactElement<P>} [element] - instance target to receive new props
 * @param {{}} [props] - object of new props
 * @returns {false | React.ReactElement<Intersect<P, props>>} cloned React Element with shallowly merged props
 * @requires `react`
 * @template {{}} P - props obj
 * @example
 *
 * withNewProps(<Container prop0='val0' />, { prop1: 'val1', prop2: 'val2' })
 * // => <Container prop0='val0' prop1='val1' prop2='val2' />
 * withNewProps(<Container prop3='important-value' />, { prop3: 'val3', prop4: 'val4' })
 * // => <Container prop3='val3' prop4='val4' />
 *
 */
export const withProps = (element, props = {}) =>
  element &&
  React.cloneElement(element, { ...element.props, ...removeUndef(props) })

/**
 * helper function to find and return semantic name used for debugging components
 *
 * @param {object} target - usually a react element
 * @param {string=} target.displayName - manually defined name for debug
 * @param {string=} target.name - generally assigned via React from var name
 * @returns {string} best "name" of element
 */
export const getComponentName = ({ displayName, name }) =>
  displayName || name || "SSUIComponent"

/**
 * add a string tab label to React DevTools via displayName property
 *
 * @template T
 * @param {string} tag - label to display
 * @param {T} target - any component definition
 * @returns {T & { displayName: string }} mutated input for convenience
 */
export const withTag = (tag, target) => {
  // eslint-disable-next-line no-param-reassign
  target.displayName = `${tag}(${getComponentName(target)})`
  return target
}

/**
 * @deprecated replaced with transient props from styled-components
 *
 * Dynamically prevent props from reaching DOM elements
 * by providing styled-components a prop blacklist. Most
 * useful to prevent props intended for a styled component
 * from getting picked up by the {...rest} of the base component.
 *
 * Technical: closes over input Component and coerces rendered EnhancedComponent element
 * to Component.type.
 *
 * @param {React.ComponentType<{ children?: any; ref?: any }>} Component - tgt to control props of
 * @param {string[]} propKeys - array of prop keys to block
 * @returns {React.ForwardRefExoticComponent<Intersect<Pick<Intersect<Record<string, any>, {children?: any}>, number|string>, React.RefAttributes<any>>>}
 * ref forwarding function that removes unwanted `propKeys` from original props
 * @requires `react` && usually `styled-components`
 * @see https://www.styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
 * @todo check out making curried like this: https://codesandbox.io/s/l50mlwqo1q
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
    const filteredProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !propKeys.includes(key))
    )

    return (
      <Component ref={ref} {...filteredProps}>
        {children}
      </Component>
    )
  }

  // attach "FilteredProps" tag in React Dev Tools v5
  FilteredComponent.displayName = `FilteredProps(${getComponentName(
    Component
  )})`

  // ensure ref points to Element NOT functional FilteredComponent
  const result = React.forwardRef(FilteredComponent)
  result.displayName = `FilteredProps(${result.displayName})` // pass thru original name tags

  return result
}

// helpful for testing
export const sleep = (ms) => (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))
