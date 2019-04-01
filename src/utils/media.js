import { css } from 'styled-components'

// FIXME: not transpiling with styled-components babel plugin instead
// of default babel transpilation - pending update from styled-component-namespaces
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

/** @TODO convert to string based interpolation */

/**
 * allow quick implementation of standardized media query sizes
 */
const media = {
  /**
   * apply styled-component css when screen-size <= 425px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.phone`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  phone: (...args) => css`
    @media only screen and (max-width: 425px) {
      ${css(...args)}
    }
  `,

  /**
   * apply styled-component css when screen-size >= 426px && screen-size <= 767px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.tablet`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  tablet: (...args) => css`
    @media only screen and (min-width: 426px) and (max-width: 767px) {
      ${css(...args)}
    }
  `,

  /**
   * apply styled-component css when screen-size <= 767px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.mobile`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  mobile: (...args) => css`
    @media only screen and (max-width: 767px) {
      ${css(...args)}
    }
  `,

  /**
   * apply styled-component css when screen-size >= 768px && screen-size <= 991px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.laptop`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  laptop: (...args) => css`
    @media only screen and (min-width: 768px) and (max-width:991px) {
      ${css(...args)}
    }
  `,

  /**
   * apply styled-component css when screen-size >= 992px && screen-size <= 1199px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.desktop`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  desktop: (...args) => css`
    @media only screen and (min-width: 992px) and (max-width:1199px) {
      ${css(...args)}
    }
  `,

  /**
   * apply styled-component css when screen-size >= 1200px
   *
   * @requires `styled-components`
   * @param {any[]} args template literal of css to be interpolated
   * @returns {any[]} css wrapped in media query
   * @example
   * ```
   * const Component = styled.div`
   *  ${media.desktop`
   *    font-size: 0.97rem;
   *  `};
   * `
   * ```
   */
  widescreen: (...args) => css`
    @media only screen and (min-width: 1200px) {
      ${css(...args)}
    }
  `
}

export default media
