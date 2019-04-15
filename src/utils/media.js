/**
 * allow quick implementation of standardized media query sizes
 *
 * `phone <= 425px`
 *
 * `426px <= tablet <= 767px`
 *
 * `mobile <= 767px`
 *
 * `768px <= laptop <= 991px`
 *
 * `992px <= desktop <= 1199px`
 *
 * `1200px <= widescreen`
 */
export const media = {
  /**
   * apply styled-component css when screen-size <= 425px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.phone} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  phone: 'only screen and (max-width: 425px)',

  /**
   * apply styled-component css when screen-size >= 426px && screen-size <= 767px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.tablet} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  tablet: 'only screen and (min-width: 426px) and (max-width: 767px)',

  /**
   * apply styled-component css when screen-size <= 767px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.mobile} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  mobile: 'only screen and (max-width: 767px)',

  /**
   * apply styled-component css when screen-size >= 768px && screen-size <= 991px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.laptop} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  laptop: 'only screen and (min-width: 768px) and (max-width:991px)',

  /**
   * apply styled-component css when screen-size >= 992px && screen-size <= 1199px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.desktop} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  desktop: 'only screen and (min-width: 992px) and (max-width:1199px)',

  /**
   * apply styled-component css when screen-size >= 1200px
   *
   * @example
   * const Component = styled.div`
   *  @media ${media.widescreen} {
   *    font-size: 0.97rem;
   *  }
   * `
   */
  widescreen: 'only screen and (min-width: 1200px)'
}
