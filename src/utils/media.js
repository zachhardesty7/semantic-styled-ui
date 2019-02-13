import { css } from 'styled-components'

/**
 * allow quick implementation of standardized media query sizes
 */
const media = {
  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  phone: (...args) => css`
    @media only screen and (max-width: 425px) {
      ${css(...args)}
    }
  `,

  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  tablet: (...args) => css`
    @media only screen and (min-width: 426px) and (max-width: 767px) {
      ${css(...args)}
    }
  `,

  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  mobile: (...args) => css`
    @media only screen and (max-width: 767px) {
      ${css(...args)}
    }
  `,

  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  laptop: (...args) => css`
    @media only screen and (min-width: 768px) and (max-width:991px) {
      ${css(...args)}
    }
  `,

  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  desktop: (...args) => css`
    @media only screen and (min-width: 992px) and (max-width:1199px) {
      ${css(...args)}
    }
  `,

  /**
   * @param {TemplateStringsArray} args template literal of css
   * @returns {TemplateStringsArray} template literal of css wrapped in media query
   */
  widescreen: (...args) => css`
    @media only screen and (min-width: 1200px) {
      ${css(...args)}
    }
  `
}

export default media
