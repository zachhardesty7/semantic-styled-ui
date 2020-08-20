/* eslint-disable jsdoc/check-tag-names */
/**
 * allow quick implementation of standardized media query sizes
 *
 * phone: `<= 425px`
 *
 * tablet: `426px - 767px`
 *
 * mobile: `<= 767px`
 *
 * laptop: `768px - 991px`
 *
 * portable: `<= 991px`
 *
 * stationary: `>= 992px`
 *
 * desktop: `992px - 1199px`
 *
 * widescreen: `1200px - 1919px`
 *
 * ultrawide: `>= 1920px`
 */
export const media = {
  /**
   * apply styled-component css when screen-size `<= 425px`
   *
   * @type {"screen and (max-width: 425px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.phone} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  phone: "screen and (max-width: 425px)",

  /**
   * apply styled-component css when screen-size `>= 426px` && screen-size `<= 767px`
   *
   * @type {"screen and (min-width: 426px) and (max-width: 767px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.tablet} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  tablet: "screen and (min-width: 426px) and (max-width: 767px)",

  /**
   * apply styled-component css when screen-size `<= 767px`
   *
   * @type {"screen and (max-width: 767px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.mobile} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  mobile: "screen and (max-width: 767px)",

  /**
   * apply styled-component css when screen-size `>= 768px` && screen-size `<= 991px`
   *
   * @type {"screen and (min-width: 768px) and (max-width:991px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.laptop} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  laptop: "screen and (min-width: 768px) and (max-width: 991px)",

  /**
   * apply styled-component css when screen-size `<= 991px`
   *
   * @type {"screen and (max-width: 991px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.portable} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  portable: "screen and (max-width: 991px)",

  /**
   * apply styled-component css when screen-size `>= 992px`
   *
   * @type {"screen and (min-width: 992px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.stationary} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  stationary: "screen and (min-width: 992px)",

  /**
   * apply styled-component css when screen-size `>= 992px` && screen-size `<= 1199px`
   *
   * @type {"screen and (min-width: 992px) and (max-width: 1199px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.desktop} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  desktop: "screen and (min-width: 992px) and (max-width: 1199px)",

  /**
   * apply styled-component css when screen-size `1200px - 1919px`
   *
   * @type {"screen and (min-width: 1200px) and (max-width: 1919px)"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.widescreen} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  widescreen: "screen and (min-width: 1200px)",

  /**
   * apply styled-component css when screen-size `>= 1920px`
   *
   * @type {"screen and (min-width: 1920px"}
   * @example
   * const Component = styled.div`
   *  [at]media ${media.ultrawide} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  ultrawide: "screen and (min-width: 1920px)",
}
