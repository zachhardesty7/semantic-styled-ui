import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
import Blurb from '../components/Blurb'

import { asTag, media, withNewProps } from '../utils'

const BlurbsSegmentTagged = asTag(Segment)
const BlurbsSegment = styled(BlurbsSegmentTagged)`
  && {
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
    `};

    ${media.phone`
      .container {
        margin: 0 2em !important;
      }
    `};
  }
`

const HeaderContainer = styled(Container)`
  && {
    /* pad between title/content and items */
    padding-bottom: 3em;

    h3 {
      font-size: 3em;
    }
  }
`

const Blurbs = ({
  title,
  content,
  color,
  className,
  children
}) => (
  <BlurbsSegment
    tag='section'
    vertical
    basic
    secondary
    className={className}
  >
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
            {withNewProps(blurb, { color })}
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  </BlurbsSegment>
)

Blurbs.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

Blurbs.defaultProps = {
  title: null,
  content: null,
  color: '',
  className: '',
  children: null
}

// NOTE: prevent error when attempting to double memoize components
const BlurbsMemo = React.memo(Blurbs)
BlurbsMemo.Item = Blurb

export default BlurbsMemo
