import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'

import styled from 'styled-components'
import { Container } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { defaultColors, utils } from '../utils'

const FAIcon = styled(FontAwesomeIcon)`
  color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.secondary || defaultColors.secondary
        : theme.primary || defaultColors.primary
    )
  )};

  &:hover {
    color: ${({ color, inverted, theme }) => (
    color || (
      inverted
        ? theme.white || defaultColors.white
        : theme.secondary || defaultColors.secondary
    )
  )};
  }

  margin: 0 0.5em;
`

const SocialMediaIcons = ({ icons, inverted, color }) => (
  <Container>
    {icons.map(icon => (
      <Async
        key={utils.toJoinedTitleCase(icon.name)}
        promise={import('@fortawesome/free-brands-svg-icons')}
        then={iconModule => (
          <a href={icon.link || '#'} rel='noopener noreferrer' target={icon.link ? '_blank' : null}>
            <FAIcon
              inverted={inverted}
              icon={iconModule[`fa${utils.toJoinedTitleCase(icon.name)}`]}
              size='lg'
            />
          </a>
        )}
      />
    ))}
  </Container>
)

SocialMediaIcons.propTypes = {
  color: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  inverted: PropTypes.bool
}

SocialMediaIcons.defaultProps = {
  color: '',
  icons: [],
  inverted: false
}

export default React.memo(SocialMediaIcons)
