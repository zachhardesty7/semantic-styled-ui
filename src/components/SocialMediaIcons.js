import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import styled from 'styled-components'

import { Container } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import theme from '../theme'

import { toJoinedTitleCase } from '../utils'

const FAIcon = styled(FontAwesomeIcon)`
  color: ${({ inverted }) => (inverted ? theme.secondary : theme.primary)};
  margin: 0 0.5em;

  &:hover {
    color: ${({ inverted }) => (inverted ? theme.white : theme.secondary)};
  }
`

const SocialMediaIcons = ({ icons, inverted }) => (
  <Container>
    {icons.map(icon => (
      <Async
        key={toJoinedTitleCase(icon.name)}
        promise={import('@fortawesome/free-brands-svg-icons')}
        then={iconModule => (
          <a href={icon.link || '#'} rel='noopener noreferrer' target={icon.link ? '_blank' : null}>
            <FAIcon
              inverted={inverted}
              icon={iconModule[`fa${toJoinedTitleCase(icon.name)}`]}
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
