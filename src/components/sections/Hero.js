import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import {
  Container,
  Header,
  Segment,
  Transition
} from 'semantic-ui-react'
import HeroButton from '../HeroButton'

import {
  asTag,
  defaultColors,
  getColor,
  media,
  withoutProps
} from '../../utils'

const sizes = {
  small: {
    relaxed: '8em',
    base: '6em',
    compact: '4em'
  },
  large: {
    relaxed: '24em',
    base: '16em',
    compact: '8em'
  }
}

const S = {}

const FilteredSegment = withoutProps(Segment, ['size'])
S.Segment = styled(FilteredSegment)`
  padding-top: ${({ baseline, size }) => (
    baseline === 'top'
      ? sizes.small[size]
      : sizes.large[size]
  )};
  padding-bottom: ${({ baseline, size }) => (
    baseline === 'top'
      ? sizes.large[size]
      : sizes.small[size]
  )};

  /* background overlay to dim and saturate */
  &::before {
    content: "";
    height: 100%;
    width: 100.5%;
    background: ${({ overlay }) => (
    (overlay === 'dark' && 'linear-gradient(0deg,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))') ||
      (overlay === 'darker' && 'linear-gradient(0deg,rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65))')
  )};
    filter: saturate(2) sepia(0.4);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center +45%;
    top: 0;
    left: -0.5%;
    position: absolute;
    z-index: 2;
  }
`

const FilteredHeader = asTag(withoutProps(Header, ['inlineLogo', 'color']))
S.BaseHeader = styled(FilteredHeader)`
  ${getColor('white')};
  font-display: fallback;
  font-weight: normal;
`

S.Title = styled(S.BaseHeader)`
  ${({ inlineLogo }) => inlineLogo && 'display: inline-block'};
  ${({ inlineLogo }) => inlineLogo && 'margin-bottom: 0'};
  padding-right: 0.15em;
  font-size: 4.7em;
  
  @media ${media.laptop} {
    font-size: 4em;
  }
  @media ${media.tablet} {
    font-size: 3.8em;
  }
  @media ${media.phone} {
    font-size: 12vw;
    width: fit-content;
  }
`

S.Subtitle = styled(S.BaseHeader)`
  ${({ inlineLogo }) => inlineLogo && 'margin-top: 0.75em'};
  font-size: 1.7rem;

  @media ${media.laptop} {
    font-size: 1.45em;
  }
  @media ${media.tablet} {
    font-size: 1.4em;
  }
  @media ${media.phone} {
    width: min-content;
    min-width: 11em;
    font-size: 1.4em;
  }
`

S.Chunk = styled.header`
  display: inline-block;
  border-bottom: ${({ underline, theme }) => (
    (underline === true && css`5px solid ${theme.accent || defaultColors.accent}`) ||
    (underline && css`5px solid ${underline || theme.accent || defaultColors.accent}`) ||
    'none'
  )};
  z-index: 3;
  position: relative;
`

/* use "!important" to override Gatsby-Image inline style */
S.BackgroundImage = styled.img`
  position: absolute !important;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: 1;
  img:last-child {
    object-fit: cover !important;
    object-position: 45% 55% !important;
  }
`

S.Logo = styled.img`
  margin-right: 1em;
`

const Hero = ({
  overlay,
  logo,
  inlineLogo,
  color,
  title,
  subtitle,
  baseline,
  underline,
  size,
  button,
  children,
  ...rest
}) => {
  const [curBackground, setCurBackground] = useState(0)
  useEffect(() => {
    const cycle = setTimeout(() => {
      setCurBackground((curBackground + 1) % (React.Children.count(children)))
    }, 6000)

    return () => clearTimeout(cycle)
  })

  return (
    <S.Segment
      vertical
      baseline={baseline}
      size={size}
      overlay={overlay}
      {...rest}
    >
      {React.Children.map(children, (Background, i) => (
        <Transition
          key={Background.props.alt}
          visible={i === curBackground}
          animation='fade'
          duration={3000}
        >
          <S.BackgroundImage as={Background.type} {...Background.props} />
        </Transition>
      ))}

      <Container>
        {/* nested inline chunk to facilitate underline */}
        <S.Chunk underline={underline}>
          {logo && (
            <S.Logo as={logo.type} {...logo.props} alt='logo' />
          )}

          {title && (
            <S.Title tag='h1' color={color} inlineLogo={inlineLogo}>{title}</S.Title>
          )}

          {subtitle && (
            <S.Subtitle tag='h2' color={color} inlineLogo={inlineLogo}>{subtitle}</S.Subtitle>
          )}

          {button}
        </S.Chunk>
      </Container>
    </S.Segment>
  )
}

Hero.propTypes = {
  /** darken background image to improve readability */
  overlay: PropTypes.oneOf(['dark', 'darker']),

  /** align content to top or bottom */
  baseline: PropTypes.oneOf(['top', 'bottom']),

  /** apply css supported color string or use default if true */
  underline: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),

  /** size using "em" units */
  size: PropTypes.oneOf(['compact', 'base', 'relaxed']),

  /** image of logo */
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),

  /** format logo left of content */
  inlineLogo: PropTypes.bool,

  /** apply css supported color string to Icon and text, overrides theme / default */
  color: PropTypes.string,

  /** primary content */
  title: PropTypes.node,

  /** secondary content */
  subtitle: PropTypes.node,

  /** call-to-action @see [`HeaderButton`](#headerbutton) */
  button: PropTypes.node,

  /** background images */
  children: PropTypes.node
}

Hero.defaultProps = {
  overlay: 'dark',
  baseline: false,
  underline: false,
  size: 'base',
  logo: null,
  inlineLogo: false,
  color: '',
  title: null,
  subtitle: null,
  button: null,
  children: null
}

const HeroMemo = React.memo(Hero)
HeroMemo.Button = HeroButton
export default HeroMemo
