import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'

import { Container } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toJoinedTitleCase } from '../utils'

import './SocialMediaIcons.scss'

const SocialMediaIcons = ({ icons, inverted }) => (
  <Container className={`socialMediaIcons ${inverted ? 'inverted' : undefined}`}>
    {icons && icons.map(icon => (
      <Async
        key={toJoinedTitleCase(icon.name)}
        promise={import('@fortawesome/free-brands-svg-icons')}
        then={iconModule => (
          <a href={icon.link} rel='noopener noreferrer' target='_blank'>
            <FontAwesomeIcon
              icon={iconModule[`fa${toJoinedTitleCase(icon.name)}`]}
              className='button-icon'
              size='lg'
            />
          </a>
        )}
      />
    ))}
  </Container>
)

SocialMediaIcons.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  inverted: PropTypes.bool
}

SocialMediaIcons.defaultProps = {
  icons: [],
  inverted: false
}

export default SocialMediaIcons
