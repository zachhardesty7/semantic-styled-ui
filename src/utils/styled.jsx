import { camelToKebab } from "./helpers"
import { defaultColors } from "./colors"
import { spacingMap } from "./consts"

/**
 * @typedef {import("../types").SpacingSides} SpacingSides
 */

/**
 * can be used as a styled components function that accepts props or by executing the
 * curried func, to return a string in spacing units
 *
 * @param {SpacingSides | SpacingSides[]} sides - what sides to apply padding to,
 * multiple sides supported as array
 * @returns {(val: string | { $padding: string } | { padding: string }) => {}} curried
 * function that can be expanded in a styled template string or left to automatically
 * execute using props from styled component
 *
 * @example
 *
 * const styledObj = padding("start")("1em") // =>> { paddingInlineStart: "1em" }
 * const styledFunc = padding("bottom") // =>> (props) => { paddingBlockEnd: "2em" }
 * const StyledComponent = styled.div`
 *    ${padding("all")("0")};
 *    ${styledObj};
 *    ${styledFunc};
 * `
 *
 * const FC = () => (
 *    <StyledComponent $padding='2em' />
 * )
 */
export const padding = (sides) => (raw) => {
  let val = raw.$padding || raw.padding || raw // priority goes to a props object
  // decode supported strings like "compact"
  if (Object.keys(spacingMap).includes(val)) val = spacingMap[val]

  // NOTE: guaranteed to have a spacing unit string here (e.g. "20px", "10em", "0")

  if (sides.includes("all")) {
    return {
      paddingBlockStart: val,
      paddingBlockEnd: val,
      paddingInlineStart: val,
      paddingInlineEnd: val,
    }
  }

  const styles = {}

  if (sides.includes("left")) styles.paddingInlineStart = val
  if (sides.includes("start")) styles.paddingInlineStart = val
  if (sides.includes("right")) styles.paddingInlineEnd = val
  if (sides.includes("end")) styles.paddingInlineEnd = val

  if (sides.includes("top")) styles.paddingBlockStart = val
  if (sides.includes("bottom")) styles.paddingBlockEnd = val

  if (sides.includes("horizontal")) {
    styles.paddingInlineStart = val
    styles.paddingInlineEnd = val
  }
  if (sides.includes("vertical")) {
    styles.paddingBlockStart = val
    styles.paddingBlockEnd = val
  }

  return styles
}

/**
 * can be used as a styled components function that accepts props or by executing the
 * curried func, to return a string in spacing units
 *
 * @param {SpacingSides | SpacingSides[]} sides - what sides to apply margin to,
 * multiple sides supported as array
 * @returns {(val: string | { $margin: string } | { margin: string }) => {}} curried
 * function that can be expanded in a styled template string or left to automatically
 * execute using props from styled component
 *
 * @example
 *
 * const styledObj = margin("start")("1em") // =>> { marginInlineStart: "1em" }
 * const styledFunc = margin("bottom") // =>> (props) => { marginBlockEnd: "2em" }
 * const StyledComponent = styled.div`
 *    ${styledObj};
 *    ${styledFunc};
 * `
 *
 * const FC = () => (
 *    <StyledComponent $margin='2em' />
 * )
 */
export const margin = (sides) => (raw = "0") => {
  let val = raw.$margin || raw.margin || raw // priority goes to a props object
  // decode supported strings like "compact"
  if (Object.keys(spacingMap).includes(val)) val = spacingMap[val]

  // NOTE: guaranteed to have a spacing unit string here (e.g. "20px", "10em", "0")

  if (sides.includes("all")) {
    return {
      marginInlineStart: val,
      marginInlineEnd: val,
      marginBlockStart: val,
      marginBlockEnd: val,
    }
  }

  const styles = {}

  if (sides.includes("left")) styles.marginInlineStart = val
  if (sides.includes("start")) styles.marginInlineStart = val
  if (sides.includes("right")) styles.marginInlineEnd = val
  if (sides.includes("end")) styles.marginInlineEnd = val

  if (sides.includes("top")) styles.marginBlockStart = val
  if (sides.includes("bottom")) styles.marginBlockEnd = val

  if (sides.includes("horizontal")) {
    styles.marginInlineStart = val
    styles.marginInlineEnd = val
  }
  if (sides.includes("vertical")) {
    styles.marginBlockStart = val
    styles.marginBlockEnd = val
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
 *    ${getProperty('$margin')('default')};
 * `
 *
 * const FC = () => (
 *    <StyledElement $margin='2em' />
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
 *  ${getHoverProperty('$marginHover')('default')};
 * `
 *
 * <StyledElement $marginHover='2em' />
 */
export const getHoverProperty = (property) => (preset) => (props) => {
  const propKey = camelToKebab(property.slice(1, property.indexOf("Hover")))
  return {
    "&:hover": {
      [propKey]:
        props[property] || props.theme[preset] || defaultColors[preset],
    },
  }
}

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
 * <StyledElement $color='red' />
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
 * <StyledElement $backgroundColor='red' />
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
 * <StyledElement $colorHover='red' />
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
 * <StyledElement $backgroundColorHover='red' />
 */
export const getHoverBackgroundColor = getHoverProperty("$backgroundColorHover")
