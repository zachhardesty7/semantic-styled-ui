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

/* set default to relaxed vertical padding */
/* fix absurdly wide blurb segments on tablet size */
const BlurbsSegmentTagged = asTag(Segment)
const BlurbsSegment = styled(BlurbsSegmentTagged)`
  padding-top: 6em;
  padding-bottom: 6em;

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
`

const HeaderContainer = styled(Container)`
  /* pad between title/content and items */
  padding-bottom: 2.75em;
`

const HeaderTagged = asTag(Header)
const HeaderTitle = styled(HeaderTagged)`
  font-size: 3em;
`

const Blurbs = ({
  title,
  content,
  textAlign,
  color,
  secondary,
  className,
  children
}) => (
  <BlurbsSegment
    tag='section'
    vertical
    basic
    secondary={secondary}
    className={className}
  >
    {(title || content) && (
      <HeaderContainer text>
        {title && (
          <HeaderTitle tag='h3' textAlign='center'>{title}</HeaderTitle>
        )}
        {content && (
          <Header.Content textAlign={textAlign}>{content}</Header.Content>
        )}
      </HeaderContainer>
    )}
    <Container textAlign='center'>
      {/* relaxed stackable divided padded */}
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
  /** header */
  title: PropTypes.node,

  /** body content proceeding blurbs */
  content: PropTypes.node,

  /** format body content */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

  /** apply css supported color string to all children, overrides theme / default */
  color: PropTypes.string,

  /** format to appear less prominent (grey background) */
  secondary: PropTypes.bool,

  /** additional or pass thru classes for composition */
  className: PropTypes.string,

  /** primary content of Blurbs.Item */
  children: PropTypes.node
}

Blurbs.defaultProps = {
  title: null,
  content: null,
  textAlign: 'left',
  color: '',
  secondary: false,
  className: '',
  children: null
}

// NOTE: prevent error when attempting to double memoize components
const BlurbsMemo = React.memo(Blurbs)
BlurbsMemo.Item = Blurb

export default BlurbsMemo
