import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Header,
  Segment,
  Transition
} from 'semantic-ui-react'
import HeroButton from '../components/HeroButton'

import {
  applyTag,
  defaultColors,
  getColor,
  media,
  withoutProps
} from '../utils'

const sizes = {
  small: {
    relaxed: 8,
    base: 6,
    compact: 4
  },
  large: {
    relaxed: 24,
    base: 16,
    compact: 8
  }
}

const FilteredHeroSegment = withoutProps(Segment, ['size'])
const HeroSegment = styled(FilteredHeroSegment)`
  padding-top: ${({ baseline, size }) => (
    baseline === 'top'
      ? sizes.small[size]
      : sizes.large[size]
  )}em;
  padding-bottom: ${({ baseline, size }) => (
    baseline === 'top'
      ? sizes.large[size]
      : sizes.small[size]
  )}em;

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
    z-index: 2 !important;
  }
`

const HeroHeaderTagged = applyTag(Header)
const HeroHeader = styled(HeroHeaderTagged)`
  ${getColor('white')}
  font-display: fallback;
  font-weight: normal !important;
`

const HeroTitle = styled(HeroHeader)`
  && {
    ${({ inlineLogo }) => inlineLogo && 'display: inline-block'};
    ${({ inlineLogo }) => inlineLogo && 'margin-bottom: 0'};
    padding-right: 0.15em;
    font-size: 4.7em;

    ${media.laptop`
      font-size: 4em;
    `}
    ${media.tablet`
      font-size: 3.8em;
    `}
    ${media.phone`
      font-size: 12vw !important;
      width: fit-content !important;
    `}
  }
`

const HeroSubtitle = styled(HeroHeader)`
  ${({ inlineLogo }) => inlineLogo && 'margin-top: 0.75em'};
  font-size: 1.7rem;

  ${media.laptop`
    font-size: 1.45em;
  `}
  ${media.tablet`
    font-size: 1.4em;
  `}
  ${media.phone`
    width: min-content;
    min-width: 11em;
    font-size: 1.4em;
  `}
`

const Chunk = styled.header`
  display: inline-block;
  border-bottom: ${({ underline, theme }) => (
    (underline === true && (theme.accent || defaultColors.accent)) ||
    underline
      ? `5px solid ${underline || theme.accent || defaultColors.accent}`
      : 'none'
  )};
  z-index: 3;
  position: relative;
`

const BackgroundImage = styled.img`
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

const Logo = styled.img`
  margin-right: 1em;
`

const Hero = ({
  overlay,
  logo,
  inlineLogo,
  title,
  subtitle,
  baseline,
  underline,
  size,
  button,
  className,
  children
}) => {
  const [curBackground, setCurBackground] = useState(0)
  useEffect(() => {
    const cycle = setTimeout(() => {
      setCurBackground((curBackground + 1) % (React.Children.count(children)))
    }, 6000)

    return () => clearTimeout(cycle)
  })

  return (
    <HeroSegment
      vertical
      baseline={baseline}
      size={size}
      overlay={overlay}
      className={className}
    >
      {React.Children.map(children, (Background, i) => (
        <Transition
          key={Background.props.alt}
          visible={i === curBackground}
          animation='fade'
          duration={3000}
        >
          <BackgroundImage as={Background.type} {...Background.props} />
        </Transition>
      ))}

      <Container>
        {/* nested inline chunk to facilitate underline */}
        <Chunk underline={underline}>
          {logo && (
            <Logo as={logo.type} {...logo.props} alt='logo' />
          )}

          {title && (
            <HeroTitle tag='h1' inlineLogo={inlineLogo}>{title}</HeroTitle>
          )}

          {subtitle && (
            <HeroSubtitle tag='h2' inlineLogo={inlineLogo}>{subtitle}</HeroSubtitle>
          )}

          {button}
        </Chunk>
      </Container>
    </HeroSegment>
  )
}

Hero.propTypes = {
  overlay: PropTypes.oneOf(['dark', 'darker']),
  baseline: PropTypes.oneOf(['top', 'bottom']),
  underline: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  size: PropTypes.oneOf(['compact', 'base', 'relaxed']),
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  inlineLogo: PropTypes.bool,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  button: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node
}

Hero.defaultProps = {
  overlay: 'dark',
  baseline: false,
  underline: false,
  size: 'base',
  logo: null,
  inlineLogo: false,
  title: null,
  subtitle: null,
  button: null,
  className: '',
  children: null
}

const HeroMemo = React.memo(Hero)
HeroMemo.Button = HeroButton
export default HeroMemo
