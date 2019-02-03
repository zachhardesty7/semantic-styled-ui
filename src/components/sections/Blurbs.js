import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Grid,
  Container,
  Segment,
  Header
} from 'semantic-ui-react'
import { Blurb } from '..'
import { media, utils } from '../../utils'

const BlurbsSegment = styled(Segment)`
  /* default relaxed spacing */
  padding-top: 5em;
  padding-bottom: 5em;

  h4 {
    font-size: 2em;
  }

  /* fix absurdly wide blurb segments */
  ${media.tablet`
    .container {
      max-width: 397px !important;
      padding: 0 1.5em;
      margin: 0 auto !important;
    }
  `}

  ${media.phone`
    .container {
      margin: 0 2em !important;
    }
  `}
`

const HeaderContainer = styled(Container)`
  /* pad between title/content and items */
  padding-bottom: 3em;

  h3 {
    font-size: 3em;
  }
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
            key={utils.toJoinedTitleCase(blurb.title)}
            promise={import('@fortawesome/free-solid-svg-icons')}
            then={icon => (
              <Grid.Column>
                <Blurb
                  icon={blurb.icon ? <FontAwesomeIcon icon={icon[`fa${utils.toJoinedTitleCase(blurb.icon)}`]} size='3x' color={color} /> : null}
                  header={blurb.title}
                  headerAs='h4'
                  headerColor={color}
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

export default React.memo(Blurbs)
