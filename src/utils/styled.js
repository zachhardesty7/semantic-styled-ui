import defaultColors from './colors'

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

// TODO: incorrectly applies color to as html property tag
// https://github.com/jxnblk/styled-system/tree/master/packages/clean-tag

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
