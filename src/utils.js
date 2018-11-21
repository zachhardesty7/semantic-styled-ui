export const toJoinedTitleCase = str => (
  str.replace(
    /\w*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1)
  ).replace(/\W/g, '')
)

// used for smooth scrolling when anchor clicking link
export const calcDuration = (scrollDistanceInPx) => {
  const min = 800
  const max = 2000

  return Math.min(Math.max(Math.abs(scrollDistanceInPx), min), max)
}

export const process = str => `field-${str.toLowerCase().replace(/\W/g, '-')}`

export const encode = data => Object.keys(data)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
  .join('&')
