import { css } from 'styled-components'
import { camelToKebab, defaultColors } from '.'

/**
 * get a function to execute inside styled components that applies target
 * css property to styled-component with backup preset from theme
 *
 * @param {string} property css property to target
 * @returns {(preset?: string) => function} will destructure props and return style object
 */
const getProperty = property => preset => ({ [property]: val, theme }) => ({
  [property]: val || theme?.[preset] || defaultColors[preset]
})

/**
 * get a function to execute inside styled components that applies target
 * css property as hover style to styled-component with backup preset from theme
 *
 * @param {string} property css property to target
 * @returns {(preset?: string) => function} will destructure props and return style template inside
 * hover selector
 */
const getHoverProperty = property => preset => ({ [property]: val, theme }) => (css`
  &:hover {
    ${camelToKebab(property.slice(0, property.indexOf('Hover')))}: ${val || theme?.[preset] || defaultColors[preset]};
  }
`)

// NOTE: use withoutProps helper to remove DOM tags

/**
 * applies css property 'color' to styled-component with backup preset from theme
 *
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} will destructure props and return style object
 */
export const getColor = getProperty('color')

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} will destructure props and return style object
 */
export const getBackgroundColor = getProperty('backgroundColor')

/**
 * applies css property 'color' to styled-component with backup preset from theme
 *
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} will destructure props and return style object
 */
export const getHoverColor = getHoverProperty('colorHover')

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} will destructure props and return style object
 */
export const getHoverBackgroundColor = getHoverProperty('backgroundColorHover')
