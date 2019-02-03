import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import GImage from 'gatsby-image'

import styled from 'styled-components'
import {
  Button,
  Container,
  Header,
  Transition,
  Segment
} from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { theme, media } from '../theme'

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
  padding-top: ${({ baseline, size }) => (baseline === 'top' ? sizes.small[size] : sizes.large[size])}em;
  padding-bottom: ${({ baseline, size }) => (baseline === 'top' ? sizes.large[size] : sizes.small[size])}em;

  h1,
  h2 {
    color: ${theme.white};
    font-display: fallback;
  }

  h1 {
    font-size: 4.7em;
  }

  h2 {
    font-size: 1.7rem;
  }

  ${media.laptop`
    h1 {
      font-size: 4em;
    }

    h2 {
      font-size: 1.45em;
    }
  `}

  ${media.tablet`
    h1 {
      font-size: 3.8em;
    }

    h2 {
      font-size: 1.4em;
    }
  `}

  ${media.phone`
    h1 {
      font-size: 13.5vw !important;
      width: fit-content !important;
    }

    h2 {
      width: min-content;
      min-width: 11em;
      font-size: 1.4em;
    }
  `}

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
    background-color: ${theme.secondary};
    transition: ease-in-out 50ms;

    &:hover {
      transition: ease-in-out 100ms;
      color: ${theme.secondary};
      background-color: ${theme.primary};
    }
  }
`

const Chunk = styled.div`
  display: inline-block;
  border-bottom: 5px solid ${theme.accent};
  margin-right: 5px;
  z-index: 3;
  position: relative;
`

const BackgroundImage = styled(GImage)`
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

const Logo = styled(GImage)`
  margin-right: 1em;
  vertical-align: bottom;
`

const FAIcon = styled(FontAwesomeIcon)`
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
  background,
  backgroundAlt,
  buttonText,
  buttonProps
}) => {
  const [curBackground, setCurBackground] = useState(0)
  useEffect(() => {
    const cycle = setTimeout(() => {
      setCurBackground((curBackground + 1) % (background.length))
    }, 6000)

    return () => clearTimeout(cycle)
  })

  return (
    <HeroSegment className={className} vertical baseline={baseline} size={size}>
      {/* background image */}
      {background.map((image, i) => (
        <Transition
          visible={i === curBackground}
          key={image.fluid.src}
          animation='fade'
          duration={3000}
          unmountOnHide // REVIEW: necessary? beneficial?
        >
          <div>
            <BackgroundImage
              fluid={image.fluid}
              alt={backgroundAlt}
            />
          </div>
        </Transition>
      ))}

      <Container>
        {/* nested inline chunk to facilitate underline */}
        <Chunk underline={underline}>
          {logo && (
            <Logo fixed={logo} alt='logo' />
          )}
          {title && (
            <Header as='h1' content={title} />
          )}
          {subtitle && (
            <Header as='h2' content={subtitle} />
          )}
          {buttonText && (
            <Button {...buttonProps} className='hero-button'>
              {buttonText}
              <Async
                promise={import('@fortawesome/free-solid-svg-icons/faAngleRight')}
                then={icon => (
                  <FAIcon icon={icon.faAngleRight} />
                )}
              />
            </Button>
          )}
        </Chunk>
      </Container>
    </HeroSegment>
  )
}

Hero.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  background: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element, PropTypes.object
    ]))
  ]),
  backgroundAlt: PropTypes.string,
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
  logo: null,
  title: '',
  subtitle: '',
  background: null,
  backgroundAlt: '',
  buttonText: '',
  buttonProps: null
}

export default React.memo(Hero)
