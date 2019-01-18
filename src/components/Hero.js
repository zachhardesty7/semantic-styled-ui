import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
  Button,
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '../theme'

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

const HeroSegment = styled(Segment)`
  padding-top: ${({ baseline, size }) => (baseline === 'top' ? sizes.small[size] : sizes.large[size])}em;
  padding-bottom: ${({ baseline, size }) => (baseline === 'top' ? sizes.large[size] : sizes.small[size])}em;

  @font-face {
    font-family: 'Eurostile';
    font-style: italic;
    src: url('../../static/eurostile-lt-std-bold-oblique.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Franklin Gothic Book';
    src: url('../../static/franklin-gothic-book-regular.ttf') format('truetype');
    font-weight: bolder;
    font-display: swap;
  }

  h1,
  h2 {
    color: ${theme.white};
  }

  h1 {
    font-size: 4.7em;
    line-height: 1em;
    margin-bottom: 0;
    vertical-align: baseline;
    font-weight: bolder;
    font-style: italic;
    font-family: 'Franklin Gothic Book', Tahoma, Arial, Helvetica, sans-serif !important;
  }

  h2 {
    font-size: 1.7em;
    margin-top: 0;
    font-style: italic;
    font-weight: normal;
    font-family: 'Eurostile', Tahoma, Arial, Helvetica, sans-serif !important;
  }

  & > img {
    display: block !important;
  }

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
    z-index: -1;
  }

  /* REVIEW: button can't be separate styled component due to "as" passing error */
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
`

const BackgroundImage = styled(GImage)`
  position: absolute !important;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: -2;
  /* FIXME: temp fix when not using gatsby image */
  & > img {
    object-fit: cover !important;
    object-position: 45% 55% !important;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    /* font-family: \'object-fit: cover !important; object-position: 0% 0% !important;\' // needed for IE9+ polyfill */
  }
`

// TODO: figure out bug preventing regular image from
// overriding the blurred loading image
// https://github.com/gatsbyjs/gatsby/issues/10895
const BackgroundImageVisible = styled(BackgroundImage)`
  picture img { 
    opacity: 1 !important;
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

  setTimeout(() => {
    setCurBackground((curBackground + 1) % (background.length))
  }, 5000)

  return (
    <HeroSegment vertical baseline={baseline} size={size}>
      <BackgroundImageVisible
        fluid={background[curBackground].fluid}
        alt={backgroundAlt}
      />

      {/* {background && (
      <BackgroundImage
        src={background}
        backgroundColor
        alt={backgroundAlt}
      />
    )} */}

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
    PropTypes.element, PropTypes.object
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

export default Hero
