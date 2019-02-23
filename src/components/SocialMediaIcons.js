import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Icon, Container } from 'semantic-ui-react'

import { defaultColors, utils } from '../utils'

const ColoredIcon = styled(Icon)`
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
      // REVIEW: use Icon 'link' prop
      <a href={icon.link || '#'} rel='noopener noreferrer' target={icon.link ? '_blank' : null}>
        <ColoredIcon
          inverted={inverted}
          icon={utils.toJoinedTitleCase(icon.name)}
          size='large'
        />
      </a>
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
