// REVIEW: this format provides the best format for hover intellisense without completely cluttering

/**
 * @typedef {{ start: "flex-start", end: "flex-end", center: "center", initial: "initial", justify: "normal" }} flexAlignMap
 * @type {flexAlignMap}
 */
export const flexAlignMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  initial: "initial",
  // value doesn't matter since really isn't used
  justify: "normal",
}

/**
 * @typedef {{ start: "left", end: "right", center: "center", initial: "initial", justify: "justify" }} textAlignMap
 * @type {textAlignMap}
 */
export const textAlignMap = {
  start: "left",
  end: "right",
  center: "center",
  initial: "initial",
  justify: "justify",
}

//  needs the type narrowed
//  https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html
/**
 * @typedef {{none: "0", fitted: "0.25em", compact: "0.5em", tight: "1em", base: "2em",relaxed: "4em", loose: "6em"}} spacingMap
 * @type {spacingMap}
 */
export const spacingMap = Object.freeze({
  none: "0",
  fitted: "0.25em",
  compact: "0.5em",
  tight: "1em",
  base: "2em",
  relaxed: "4em",
  loose: "6em",
})

/**
 * @typedef {{ small: 90, base: 155, large: 215 }} logoSizes
 * @type {logoSizes}
 */
export const logoSizes = {
  small: 90,
  base: 155,
  large: 215,
}

/**
 * numbers are used with `em`
 *
 * @typedef {{ small: 4, base: 6, large: 8 }} logoSizesSVG
 * @type {logoSizesSVG}
 */
export const logoSizesSVG = {
  small: 4,
  base: 6,
  large: 8,
}

/**
 * @typedef {{mini: "0.4em", tiny: "0.5em", small: "0.75em", medium: "1em", large: "1.5em", big: "2em", bigger: "3em", huge: "4em", massive: "8em" }} iconMap
 * @type {iconMap}
 */
export const iconMap = {
  mini: "0.4em",
  tiny: "0.5em",
  small: "0.75em",
  medium: "1em",
  large: "1.5em",
  big: "2em",
  bigger: "3em",
  huge: "4em",
  massive: "8em",
}
