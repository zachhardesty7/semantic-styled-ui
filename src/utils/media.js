import { css } from 'styled-components'

// FIXME: not transpiling with styled-components babel plugin instead
// of default babel transpilation
// https://github.com/styled-components/babel-plugin-styled-components/issues/78
// https://www.styled-components.com/docs/tooling#babel-plugin

/*
function _templateObject6() {
  var data =_taggedTemplateLiteralLoose(
    ["\n    width: min-content;\n    min-width: 11em;\n    font-size: 1.4em;\n  "]
  );

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}
*/

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
