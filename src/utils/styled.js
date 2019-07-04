import { css } from 'styled-components'
import { camelToKebab } from './helpers'
import { defaultColors } from './colors'

/**
 * Get a function to execute inside styled components that applies target
 * css property to styled-component with backup preset from theme.
 *
 * **NOTE**: It's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`.
 *
 * @param {string} property - css property to target
 * @returns {(preset: DefaultColor) =>
 * (props: StyledProps) =>
 * StyledReturn}
 * function that destructures `property` and applies it inside style object
 * @requires `styled-components`
 * @example
 * const StyledElement = styled.div`
 *    ${getProperty('margin')('default')};
 * `
 *
 * const FC = () => (
 *    <StyledElement margin='2em' />
 * )
 */
export const getProperty = property => preset => props => ({
	[property]: props[property] || props.theme?.[preset] || defaultColors[preset],
})

/**
 * Get a function to execute inside styled components that applies target
 * css property as hover style to styled-component with backup preset from theme.
 *
 * **NOTE**: It's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`.
 *
 * **NOTE**: Input property and props require the word `Hover` appended to the end of the prop.
 *
 * @param {string} property - css property to target (with manually appended word `Hover`)
 * @returns {(preset: DefaultColor) =>
 *  (props: StyledProps) => FlattenSimpleInterpolation}
 *  function that destructures `property` and applies
 *  it inside style template wrapped with a hover pseudo-selector
 * @requires `styled-components`
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getHoverProperty('marginHover')('default')};
 * `
 *
 * <StyledElement marginHover='2em' />
 */
export const getHoverProperty = property => preset => props => css`
  &:hover {
    ${camelToKebab(property.slice(0, property.indexOf('Hover')))}: ${props[property] || props.theme?.[preset] || defaultColors[preset]};
  }
`

/**
 * Applies css property 'color' to styled-component with backup preset from theme.
 *
 * **NOTE**: It's often necessary to prevent these props from being passed to the
 * underlying DOM element, use helper function `withoutProps`.
 *
 * @param preset optional preset to use from theme prop
 * @returns function that destructures `property` and applies it inside style object
 * @requires `styled-components`
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
 * @param preset optional preset to use from theme prop
 * @returns function that destructures `property` and applies it inside style object
 * @requires `styled-components`
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
 * **NOTE**: input property and props require the word `Hover` appended to the end of the prop
 *
 * @param preset css property to target (with manually appended word `Hover`)
 * @returns function that destructures `property` and applies it
 *  inside style template wrapped with a hover pseudo-selector
 * @requires `styled-components`
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
 * **NOTE**: input property and props require the word `Hover` appended to the end of the prop
 *
 * @param preset css property to target (with manually appended word `Hover`)
 * @returns function that destructures `property` and applies it
 *  inside style template wrapped with a hover pseudo-selector
 * @requires `styled-components`
 * @example
 *
 * const StyledElement = styled.div`
 *  ${getHoverBackgroundColor('primary')};
 * `
 *
 * <StyledElement backgroundColorHover='red' />
 */
export const getHoverBackgroundColor = getHoverProperty('backgroundColorHover')

/**
 * type definition(s)
 * @typedef {keyof typeof defaultColors} DefaultColor - property name of an object
 * @typedef {{[property: string]: any, theme?: any}} StyledProps - standard dynamic prop fetch with
 * backup theme or defaultColors
 * @typedef {{[property: string]: any}} StyledReturn - resulting object of a getter function
 *
 * imports
 * @typedef {import('styled-components').FlattenSimpleInterpolation} FlattenSimpleInterpolation
 */
