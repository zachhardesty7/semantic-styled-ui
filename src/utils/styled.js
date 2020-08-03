import { camelToKebab } from "./helpers"
import { defaultColors } from "./colors"

/**
 *
 * @param {SpacingSides | SpacingSides[]} sides - what sides to apply padding to, multiple sides supported
 * @returns {(val: string) => {}} curried function that can be expanded in a styled
 * template string
 */
export const padding = (sides) => (val) => {
  if (sides.includes("all")) {
    return {
      paddingBlockStart: val,
      paddingBlockEnd: val,
      paddingTop: val,
      paddingBottom: val,
    }
  }

  const styles = {}

  if (sides.includes("left")) styles.paddingBlockStart = val
  if (sides.includes("start")) styles.paddingBlockStart = val
  if (sides.includes("right")) styles.paddingBlockEnd = val
  if (sides.includes("end")) styles.paddingBlockEnd = val

  if (sides.includes("top")) styles.paddingTop = val
  if (sides.includes("bottom")) styles.paddingBottom = val

  if (sides.includes("horizontal")) {
    styles.paddingBlockStart = val
    styles.paddingBlockEnd = val
  }
  if (sides.includes("vertical")) {
    styles.paddingTop = val
    styles.paddingBottom = val
  }

  return styles
}

/**
 *
 * @param {SpacingSides | SpacingSides[]} sides - what sides to apply margin to, multiple sides supported
 * @returns {(val: string) => {}} curried function that can be expanded in a styled
 * template string
 */
export const margin = (sides) => (val) => {
  if (sides.includes("all")) {
    return {
      marginBlockStart: val,
      marginBlockEnd: val,
      marginTop: val,
      marginBottom: val,
    }
  }

  const styles = {}

  if (sides.includes("left")) styles.marginBlockStart = val
  if (sides.includes("start")) styles.marginBlockStart = val
  if (sides.includes("right")) styles.marginBlockEnd = val
  if (sides.includes("end")) styles.marginBlockEnd = val

  if (sides.includes("top")) styles.marginTop = val
  if (sides.includes("bottom")) styles.marginBottom = val

  if (sides.includes("horizontal")) {
    styles.marginBlockStart = val
    styles.marginBlockEnd = val
  }
  if (sides.includes("vertical")) {
    styles.marginTop = val
    styles.marginBottom = val
  }

  return styles
}

/**
 * Get a function to execute inside styled components that applies target
 * css property to styled-component with backup preset from theme.
 *
 * @param {string} property - css property to target
 * @returns {(preset: DefaultColor) => (props: Record<string, any>) => Record<string, any>}
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
export const getProperty = (property) => (preset) => (props) => ({
  [property.slice(1)]:
    props[property] || props.theme[preset] || defaultColors[preset],
})

/**
 * Get a function to execute inside styled components that applies target
 * css property as hover style to styled-component with backup preset from theme.
 *
 * **NOTE**: Input property and props require the word `Hover` appended to the end of the prop.
 *
 * @param {string} property - css property to target (with manually appended word `Hover`)
 * @returns {(preset: DefaultColor) => (props: Record<string, any>) => FlattenSimpleInterpolation}
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
/* eslint-disable max-len */
export const getHoverProperty = (property) => (preset) => (props) => {
  const propKey = camelToKebab(property.slice(1, property.indexOf("Hover")))
  return {
    "&:hover": {
      [propKey]:
        props[property] || props.theme[preset] || defaultColors[preset],
    },
  }
}
/* eslint-enable max-len */

/**
 * Applies css property 'color' to styled-component with backup preset from theme.
 *
 * @param preset - optional preset to use from theme prop
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
export const getColor = getProperty("$color")

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * @param preset - optional preset to use from theme prop
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
export const getBackgroundColor = getProperty("$backgroundColor")

/**
 * applies css property 'color' to styled-component with backup preset from theme
 *
 * **NOTE**: input property and props require the word `Hover` appended to the end of the prop
 *
 * @param preset - css property to target (with manually appended word `Hover`)
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
export const getHoverColor = getHoverProperty("$colorHover")

/**
 * applies css property 'backgroundColor' to styled-component with backup preset from theme
 *
 * **NOTE**: input property and props require the word `Hover` appended to the end of the prop
 *
 * @param preset - css property to target (with manually appended word `Hover`)
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
export const getHoverBackgroundColor = getHoverProperty("$backgroundColorHover")
