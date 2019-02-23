import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Icon,
  Button,
  Container,
  Header,
  Transition,
  Segment
} from 'semantic-ui-react'

import { defaultColors, media } from '../utils'

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

const FilteredHeroSegment = ({ size, children, ...rest }) => <Segment {...rest}>{children}</Segment>
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
    background: linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5));
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
    background-color: ${({ theme }) => theme.secondary || defaultColors.secondary};
    transition: ease-in-out 50ms;

    &:hover {
      transition: ease-in-out 100ms;
      color: ${({ theme }) => theme.secondary || defaultColors.secondary};
      background-color: ${({ theme }) => theme.primary || defaultColors.primary};
    }
  }
`

const HeroHeader = styled.div`
  color: ${({ theme }) => theme.white || defaultColors.white};
  font-display: fallback;
`

/* REVIEW: workaround for "as" issue

const handleAs = Comp => ({ innerAs, ...rest }) => <Comp as={innerAs} {...rest} />;

const CustomLinkTab = styled(handleAs(NavBarTab))`
  ...
`;
*/
const HeroTitle = styled(HeroHeader).attrs({ as: 'h1' })`
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
`

const HeroSubtitle = styled(HeroHeader).attrs({ as: 'h2' })`
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

const Chunk = styled.div`
  display: inline-block;
  border-bottom: 5px solid ${({ underline, theme }) => underline || theme.accent || defaultColors.accent};
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
  /* FIXME: temp fix when not using gatsby image */
  & > img {
    object-fit: cover !important;
    object-position: 45% 55% !important;
  }
`

const Logo = styled.img`
  margin-right: 1em;
  vertical-align: bottom;
`

const HeaderIcon = styled(Icon)`
  margin-left: .75em;
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

const Hero = ({
  className,
  logo,
  title,
  subtitle,
  baseline,
  underline,
  size,
  children,
  buttonText,
  buttonProps
}) => {
  const [curBackground, setCurBackground] = useState(0)
  useEffect(() => {
    const cycle = setTimeout(() => {
      setCurBackground((curBackground + 1) % (children.length))
    }, 6000)

    return () => clearTimeout(cycle)
  })

  return (
    <HeroSegment className={className} vertical baseline={baseline} size={size}>
      {/* REVIEW: is the only benefit to React.Children to handle single child? */}
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
            <Logo as={logo.type} alt='logo' />
          )}

          {/* use "Header" as tag to allow passing classes through to base component */}
          {title && (
            <Header as={HeroTitle}>{title}</Header>
          )}
          {subtitle && (
            <Header as={HeroSubtitle}>{subtitle}</Header>
          )}
          {buttonText && (
            // TODO: convert to single prop and composed button
            <Button {...buttonProps} className='hero-button'>
              {buttonText}
              <HeaderIcon icon='angle right' aria-hidden />
            </Button>
          )}
        </Chunk>
      </Container>
    </HeroSegment>
  )
}

Hero.propTypes = {
  className: PropTypes.string,
  baseline: PropTypes.oneOf(['top', 'bottom']),
  underline: PropTypes.string,
  size: PropTypes.oneOf(['compact', 'base', 'relaxed']),
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  buttonText: PropTypes.string,
  buttonProps: PropTypes.shape({
    basic: PropTypes.bool,
    inverted: PropTypes.bool,
    primary: PropTypes.bool,
    size: PropTypes.string,
    as: PropTypes.func,
    to: PropTypes.string,
    smooth: PropTypes.bool,
    duration: PropTypes.func
  })
}

Hero.defaultProps = {
  className: '',
  baseline: false,
  underline: null,
  size: 'base',
  logo: null,
  title: '',
  subtitle: '',
  children: null,
  buttonText: '',
  buttonProps: null
}

export default React.memo(Hero)
