/* eslint-disable react/no-multi-comp */
import React from 'react'

/**
 * shim for Object.fromEntries()
 *
 * @param {[[string, any]]} iter array of arrays of key, value pairs
 * @returns obj with key, value pairs assigned
 */
function ObjectFromEntries(iter) {
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
 * @param {string} str arbitrary input
 * @returns {string} parsed into title-case with spaces removed
 */
export const toJoinedTitleCase = str => (
  str.replace(
    /\w*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1)
  ).replace(/\W/g, '')
)

/**
 * used for smooth scrolling when clicking anchor link
 *
 * @param {number} scrollDistanceInPx
 * @returns {number} ms equal to scroll distance capped at upper and lower bounds of 800 & 2000
 */
export const calcDuration = (scrollDistanceInPx) => {
  const min = 800
  const max = 2000

  return Math.min(Math.max(Math.abs(scrollDistanceInPx), min), max)
}

/**
 * @param {string} str arbitrary input
 * @returns {string} parsed string without spaces and lowercase
 */
export const process = str => `${str.toLowerCase().replace(/\W/g, '-')}`

/**
 * camelCaseToDash('userId') => "user-id"
 * camelCaseToDash('waitAMoment') => "wait-a-moment"
 * camelCaseToDash('TurboPascal') => "turbo-pascal"
 */
export const camelToKebab = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()

/**
 * @param {object} data key-value pairs of strings from form submission
 * @returns {string} URL encoded data
 */
export const encode = data => Object.keys(data)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  .join('&')

/**
 * soft merge new props into a React Component without
 * overwriting the original props (preserves immutability)
 *
 * @param {React.ComponentType} Component target to receive new props
 * @param {React.ComponentProps} props object of new props
 * @returns {React.ComponentType} new cloned React Component with shallow merged props
 */
export const withNewProps = (Component, props) => {
  const newProps = { ...props, ...Component.props }
  return React.cloneElement(Component, { ...newProps })
}

/**
 * facilitate preventing props from reaching DOM elements
 * by providing styled-components a prop filter function
 *
 * @param {React.ComponentType} Component target to control prop flow of
 * @param {string[]} propKeys array of prop keys to control
 * @returns {Function} filter function to screen for passed props
 */
export const withoutProps = (Component, propKeys = []) => (
  React.forwardRef(({ children, ...rest }, ref) => {
    const filtered = ObjectFromEntries(Object.entries(rest)
      .filter(([key, val]) => !propKeys.includes(key)))

    return <Component ref={ref} {...filtered}>{children}</Component>
  })
)

/**
 * apply the "tag" prop to the "as" prop without overwriting
 * styled-components behavior and pass Ref
 *
 * @param {React.ComponentType} Component target to control prop flow of
 * @returns {Function} function to apply "tag" to "as"
 */
export const applyTag = Component => (
  React.forwardRef(({ tag, children, ...rest }, ref) => (
    <Component ref={ref} as={tag} {...rest}>{children}</Component>
  ))
)
