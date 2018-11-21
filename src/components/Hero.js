import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import GImage from 'gatsby-image'

import {
  Button,
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Hero.scss'

const Hero = ({
  logo,
  title,
  subtitle,
  background,
  backgroundAlt,
  buttonText,
  buttonProps
}) => (
  <Segment
    vertical
    id='hero'
  >
    {/* background image */}
    {background && (
      <GImage
        fluid={background}
        backgroundColor
        alt={backgroundAlt}
        style={{ position: `absolute` }}
        className='background'
      />
    )}

    <Container>
      {logo && (
        <GImage
          fixed={logo}
          alt='logo'
          className='logo'
        />
      )}
      {title && (
        <Header
          as='h1'
          content={title}
        />
      )}
      {subtitle && (
        <Header
          as='h2'
          content={subtitle}
        />
      )}
      {buttonText && (
        <Button {...buttonProps}>
          {buttonText}
          <Async
            promise={import('@fortawesome/free-solid-svg-icons/faAngleRight')}
            then={icon => (
              <FontAwesomeIcon icon={icon.faAngleRight} className='button-icon' />
            )}
          />
        </Button>
      )}
    </Container>
  </Segment>
)

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
