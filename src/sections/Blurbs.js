import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Grid,
  Container,
  Segment,
  Header
} from 'semantic-ui-react'
import { Blurb } from '../components'

import { media } from '../utils'

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
  children
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
      <Grid relaxed stackable columns={React.Children.count(children)} divided padded>
        {React.Children.map(children, blurb => (
          <Grid.Column>
            {blurb}
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  </BlurbsSegment>
)

Blurbs.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node
}

Blurbs.defaultProps = {
  title: '',
  color: '',
  content: '',
  children: []
}

// prevent double-memoizing components
const BlurbsMemo = React.memo(Blurbs)
BlurbsMemo.Item = Blurb

export default BlurbsMemo
