import React from 'react'
import Async from 'react-promise'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Grid,
  Container,
  Segment,
  Header
} from 'semantic-ui-react'

import { Blurb } from '.'

import { toJoinedTitleCase } from '../utils'
import theme from '../theme'

const BlurbsSegment = styled(Segment)`
  /* default relaxed spacing */
  padding-top: 5em;
  padding-bottom: 5em;

  h3 {
    font-size: 3em;
  }

  h4 {
    font-size: 2em;
  }
`

const HeaderContainer = styled(Container)`
  /* pad between title/content and items */
  padding-bottom: 3em;
`

const Blurbs = ({
  title,
  content,
  color,
  blurbs
}) => (
  <BlurbsSegment vertical basic secondary>
    {(title || content) && (
      <HeaderContainer text>
        {title && (
          <Header as='h3' textAlign='center'>{title}</Header>
        )}
        {content && (
          <Header.Content>{content}</Header.Content>
        )}
      </HeaderContainer>
    )}
    <Container textAlign='center'>
      <Grid relaxed stackable columns={blurbs.length} divided padded>
        {blurbs.map(blurb => (
          <Async
            key={toJoinedTitleCase(blurb.title)}
            promise={import('@fortawesome/free-solid-svg-icons')}
            then={icon => (
              <Grid.Column>
                <Blurb
                  icon={blurb.icon && <FontAwesomeIcon icon={icon[`fa${toJoinedTitleCase(blurb.icon)}`]} size='3x' color={color} />}
                  header={blurb.title}
                  headerAs='h4'
                  headerColor={theme.primary}
                  content={blurb.body && blurb.body.body}
                />
              </Grid.Column>
            )}
          />
        ))}
      </Grid>
    </Container>
  </BlurbsSegment>
)

Blurbs.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.node,
  blurbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string
  }))
}

Blurbs.defaultProps = {
  title: '',
  color: '',
  content: '',
  blurbs: []
}

export default Blurbs
