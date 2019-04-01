import { css } from 'styled-components'
import { camelToKebab, defaultColors } from '.'

/**
 * get a function to execute inside styled components that applies target
 * css property to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @template {keyof defaultColors} K
 * @requires `styled-components`
 * @param {string} property css property to target
 * @returns {(preset?: K) => ({propertyVal, theme}: {propertVal: string, theme?: string}) => {}}
 * function that destructures `property` and applies it inside style object
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getProperty('margin')('default')};
 * `
 *
 * <StyledElement margin='2em' />
 */
export const getProperty = property => preset => ({ [property]: val, theme }) => ({
  [property]: val || theme?.[preset] || defaultColors[preset]
})

/**
 * get a function to execute inside styled components that applies target
 * css property as hover style to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @requires `styled-components`
 * @param {string} property css property to target (append word Hover)
 * @returns {(preset?: string) => (propertyVal: string, theme?: string) => any[]}
 * function that destructures `property` and applies
 * it inside style template wrapped with a hover pseudo-selector
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getHoverProperty('marginHover')('default')};
 * `
 *
 * <StyledElement marginHover='2em' />
 */
export const getHoverProperty = property => preset => ({ [property]: val, theme }) => (css`
  &:hover {
    ${camelToKebab(property.slice(0, property.indexOf('Hover')))}: ${val || theme?.[preset] || defaultColors[preset]};
  }
`)

/**
 * applies css property 'color' to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @requires `styled-components`
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} function that destructures `property` and applies
 * it inside style object
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getColor('white')};
 * `
 *
 * <StyledElement color='red' />
 */
export const getColor = getProperty('color')

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @requires `styled-components`
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} function that destructures `property` and applies
 * it inside style object
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getBackgroundColor('secondary')};
 * `
 *
 * <StyledElement backgroundColor='red' />
 */
export const getBackgroundColor = getProperty('backgroundColor')

/**
 * applies css property 'color' to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @requires `styled-components`
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} function that destructures `property` and applies
 * it inside style object
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getHoverColor('primary')};
 * `
 *
 * <StyledElement colorHover='red' />
 */
export const getHoverColor = getHoverProperty('colorHover')

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * **NOTE**: it's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`
 *
 * @requires `styled-components`
 * @param {string} preset optional preset to use from theme prop
 * @returns {function} function that destructures `property` and applies
 * it inside style object
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getHoverBackgroundColor('primary')};
 * `
 *
 * <StyledElement backgroundColorHover='red' />
 */
export const getHoverBackgroundColor = getHoverProperty('backgroundColorHover')
