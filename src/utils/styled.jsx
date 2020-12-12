import { camelToKebab, includesAny } from "./helpers"
import { defaultColors } from "./colors"
import { spacingMap } from "./consts"

/**
 * @typedef {import("../types").SpacingSide} SpacingSide
 */

export const testUsingLastParamAsDefault = (sides) => (
  fallback,
  { internal = false }
) => {
  const output = (raw = fallback) => {
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

  // forward props if calling directly from styled-component (no default)
  if (fallback.$padding || fallback.padding) return output()

  return output
}

/**
 * helper to generate margin or padding func that can be used as a styled components
 * function that accepts props or by executing the curried func, to return a string in
 * spacing units
 *
 * @param {"padding" | "margin"} type - prefix for spacing CSS keys
 * @returns {(sides: SpacingSide | SpacingSide[]) => (val: string | { $padding?: string, padding?: string }) => {}} curried
 * function that can be expanded in a styled template string or left to automatically
 * execute using props from styled component
 * @example
 *
 * const styledObj = spacing("padding")("start")("1em") // =>> { paddingLeft: "1em" }
 * const styledFunc = spacing("padding")("bottom") // =>> (props) => { paddingBottom: "2em" }
 * const StyledComponent = styled.div`
 *    ${spacing("padding")("all")("0")};
 *    ${styledObj};
 *    ${styledFunc};
 * `
 *
 * // usage as prop only applies to the `styledFunc` version
 * const FC = () => (
 *    <StyledComponent $padding='4em' />
 * )
 *
 * // => paddingLeft === 1em
 * // => paddingTop === 0
 * // => paddingRight === 4em
 * // => paddingBottom === 0
 */
export const spacing = (type) => (sides) => (rawVal, flags = []) => {
  let val = rawVal[`$${type}`] || rawVal[type] || rawVal // priority goes to a props object
  // decode supported strings like "compact"
  if (Object.keys(spacingMap).includes(val)) val = spacingMap[val]

  // NOTE: guaranteed to have a spacing unit string here (e.g. "20px", "10em", "0")

  const styles = {}

  // translate inputted target sides to CSS property keys
  if (includesAny(sides, ["left", "start", "horizontal", "all"])) {
    styles[`${type}Left`] = val
  }
  if (includesAny(sides, ["right", "end", "horizontal", "all"])) {
    styles[`${type}Right`] = val
  }

  if (includesAny(sides, ["top", "vertical", "all"])) {
    styles[`${type}Top`] = val
  }
  if (includesAny(sides, ["bottom", "vertical", "all"])) {
    styles[`${type}Bottom`] = val
  }

  // apply flags by mapping properties to new object with modifications
  return Object.fromEntries(
    Object.entries(styles).map(([keyIn, valIn]) => {
      let keyOut = keyIn
      let valOut = valIn

      if (includesAny(flags, ["important", "!"])) {
        valOut = `${valOut} !important`
      }

      // wrap obj property in pseudo key
      if (includesAny(flags, ["internal"])) {
        if (includesAny(keyIn, ["Left", "Top", "Start"])) {
          valOut = { [keyOut]: valOut }
          keyOut = ":not(:first-child)"
        }
        if (includesAny(keyIn, ["Right", "Bottom", "End"])) {
          valOut = { [keyOut]: valOut }
          keyOut = ":not(:last-child)"
        }
      }

      if (includesAny(flags, ["external"])) {
        if (includesAny(keyIn, ["Left", "Top", "Start"])) {
          valOut = { [keyOut]: valOut }
          keyOut = ":first-child"
        }
        if (includesAny(keyIn, ["Right", "Bottom", "End"])) {
          valOut = { [keyOut]: valOut }
          keyOut = ":last-child"
        }
      }

      return [keyOut, valOut]
    })
  )
}

/**
 * can be used as a styled components function that accepts props or by executing the
 * curried func, to return a string in spacing units
 *
 * @param sides - what sides to apply padding to, multiple sides supported as array
 * @returns curried function that can be expanded in a styled template string or left to
 * automatically execute using props from styled component
 *
 * @example
 *
 * const styledObj = padding("start")("1em") // =>> { paddingLeft: "1em" }
 * const styledFunc = padding("bottom") // =>> (props) => { paddingBottom: "2em" }
 * const StyledComponent = styled.div`
 *    ${padding("all")("0")};
 *    ${styledObj};
 *    ${styledFunc};
 * `
 *
 * // usage as prop only applies to the `styledFunc` version
 * const FC = () => (
 *    <StyledComponent $padding='4em' />
 * )
 *
 * // => paddingLeft === 1em
 * // => paddingTop === 0
 * // => paddingRight === 4em
 * // => paddingBottom === 0
 */
export const padding = spacing("padding")

/**
 * can be used as a styled components function that accepts props or by executing the
 * curried func, to return a string in spacing units
 *
 * @param sides - what sides to apply margin to, multiple sides supported as array
 * @returns curried function that can be expanded in a styled template string or left to
 * automatically execute using props from styled component
 *
 * @example
 *
 * const styledObj = margin("start")("1em") // =>> { marginLeft: "1em" }
 * const styledFunc = margin("bottom") // =>> (props) => { marginBottom: "2em" }
 * const StyledComponent = styled.div`
 *    ${margin("all")("0")};
 *    ${styledObj};
 *    ${styledFunc};
 * `
 *
 * // usage as prop only applies to the `styledFunc` version
 * const FC = () => (
 *    <StyledComponent $margin='4em' />
 * )
 *
 * // => marginLeft === 1em
 * // => marginTop === 0
 * // => marginRight === 4em
 * // => marginBottom === 0
 */
export const margin = spacing("margin")

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
