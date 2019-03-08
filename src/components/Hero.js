import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Header,
  Segment,
  Transition
} from 'semantic-ui-react'
import HeroButton from './HeroButton'

import {
  defaultColors,
  getBackgroundColor,
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

  /* button can't be separate styled component due to "as" passing error */
  /* https://github.com/styled-components/styled-components/issues/2129 */
  .hero-button {
    ${getBackgroundColor('secondary')}
    transition: ease-in-out 50ms;

    &:hover {
      transition: ease-in-out 100ms;
      ${getColor('secondary')}
      ${getBackgroundColor('primary')}
    }
  }
`

const HeroHeader = styled.div`
  ${getColor('white')}
  font-display: fallback;
  font-weight: normal !important;
`

/* REVIEW: workaround for "as" issue

const handleAs = Comp => ({ innerAs, ...rest }) => <Comp as={innerAs} {...rest} />;

const CustomLinkTab = styled(handleAs(NavBarTab))`
  ...
`;
*/
const HeroTitle = styled(HeroHeader).attrs({ as: 'h1' })`
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

const HeroSubtitle = styled(HeroHeader).attrs({ as: 'h2' })`
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
    underline !== false
      ? `5px solid${underline || theme.accent || defaultColors.accent}`
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

// TODO: update default props
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

          {/* use "Header" as tag to allow passing classes through to base component */}
          {title && (
            <Header inlineLogo={inlineLogo} as={HeroTitle}>{title}</Header>
          )}

          {subtitle && (
            <Header inlineLogo={inlineLogo} as={HeroSubtitle}>{subtitle}</Header>
          )}

          {button}
        </Chunk>
      </Container>
    </HeroSegment>
  )
}

Hero.propTypes = {
  baseline: PropTypes.oneOf(['top', 'bottom']),
  underline: PropTypes.string,
  size: PropTypes.oneOf(['compact', 'base', 'relaxed']),
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  button: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node
}

Hero.defaultProps = {
  baseline: false,
  underline: false,
  size: 'base',
  logo: null,
  title: '',
  subtitle: '',
  button: null,
  className: '',
  children: null
}

const HeroMemo = React.memo(Hero)
HeroMemo.Button = HeroButton
export default HeroMemo
