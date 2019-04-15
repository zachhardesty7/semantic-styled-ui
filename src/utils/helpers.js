/* eslint-disable react/no-multi-comp */
import React from 'react'

/**
 * convert an iterable of key, value pair arrays to an object, reverses Object.entries(),
 * shim for Object.fromEntries()
 *
 * @param {Iterable<[string, any]>} iter iterable of arrays of key, value pairs
 * @returns {{}} obj with key, value pairs assigned
 */
export const ObjectFromEntries = (iter) => {
  const obj = {}
  const arr = [...iter]

  arr.forEach((pair) => {
    if (Object(pair) !== pair) {
      throw new TypeError('iterable for fromEntries should yield objects')
    }

    const { 0: key, 1: val } = pair

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: val
    })
  })

  return obj
}

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
export const process = str => `${str.toLowerCase().replace(/\W/g, '-')}`

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
 * @param {React.ReactElement<P, T>} Element instance target to receive new props
 * @param props object of new props
 * @returns {React.ReactElement<P, T>} cloned React Element with shallowly merged props
 * @requires `react`
 * @template {{}} P - props obj of input Element
 * @template {React.ElementType<P>} T - type of input Element
 * @example
 *
 * withNewProps(<Container prop0='val0' />, { prop1: 'val1', prop2: 'val2' })
 * // => <Container prop0='val0' prop1='val1' prop2='val2' />
 * withNewProps(<Container prop3='important-value' />, { prop3: 'val3', prop4: 'val4' })
 * // => <Container prop3='important-value' prop4='val4' />
 *
 */
export const withNewProps = (Element, props = {}) => (
  Element && React.cloneElement(Element, { ...props, ...Element.props })
)

/**
 * dynamically prevent props from reaching DOM elements
 * by providing styled-components a prop blacklist, most
 * useful to prevent props intended for a styled component
 * from getting picked up by the {...rest} of the base component
 *
 * @param {React.ElementType<P>} ElementType target to control prop flow of
 * @param {string[]} propKeys array of prop keys to control
 * @returns {(props: P, ref: React.RefObject<P>) => React.ForwardRefExoticComponent<P>} ref
 * forwarding function that removes unwanted `propKeys` from original props
 * @requires `react` && usually `styled-components`
 * @see https://www.styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
 * @template {{}} P - props obj of input component
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
export const withoutProps = (ElementType, propKeys = []) => {
  // facilitate debugging with named func
  const withoutPropsHOC = ({ children, ...rest }, ref) => {
    const filtered = Object.fromEntries(Object.entries(rest)
      .filter(([key, val]) => !propKeys.includes(key)))

    return <ElementType ref={ref} {...filtered}>{children}</ElementType>
  }

  return React.forwardRef(withoutPropsHOC)
}

/**
 * convert the "tag" prop to the "as" prop without overwriting
 * styled-components behavior while forwarding React Ref,
 * most useful when base component already uses the "as" tag
 * to dynamically control component rendering tag
 *
 * @param {React.ElementType<P>} ElementType target to control rendering tag
 * @returns {(props: P, ref: React.RefObject<P>) => React.ForwardRefExoticComponent<P>}
 * a function to pass ref and convert "tag" to "as"
 * @requires `react` && usually `styled-components`
 * @template {{}} P - props obj of input component
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
export const asTag = (ElementType) => {
  // facilitate debugging with named func
  const asTagHOC = ({ tag, children, ...rest }, ref) => (
    <ElementType as={tag} ref={ref} {...rest}>{children}</ElementType>
  )

  return React.forwardRef(asTagHOC)
}

// helpful for testing
export const sleep = ms => data => new Promise(resolve => setTimeout(() => resolve(data), ms))
