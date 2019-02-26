/**
 * @param {string} str input
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
 * @param {string} str arbitrary string
 * @returns {string} parsed string without spaces and lowercase
 */
export const process = str => `${str.toLowerCase().replace(/\W/g, '-')}`

/**
 * @param {object} data key-value pairs of strings from form submission
 * @returns {string} URL encoded data
 */
export const encode = data => Object.keys(data)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  .join('&')
