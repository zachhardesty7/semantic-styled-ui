import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Grid, Header } from 'semantic-ui-react'

const S = {} // styled-components namespace

S.Title = styled(Header).attrs({ forwardedAs: 'h3' })`
  font-size: 3em;
`

// TODO: test mobile, may need `container` on `Grid`
export const Section404 = ({
  title = '404: Missing Page Error',
  content = 'You\'ve arrived at an invalid URL. We apologize for the inconvenience!',
  textAlign = 'center',
  ...rest
}) => (
  <Grid textAlign={textAlign} verticalAlign='middle' {...rest}>
    <Grid.Column>
      {(title || content) && (
        <Header text>
          {title && (
            <S.Title>{title}</S.Title>
          )}
          {content && (
            <Header.Content>{content}</Header.Content>
          )}
        </Header>
      )}
    </Grid.Column>
  </Grid>
)

Section404.propTypes = {
  /** main message of the error section */
  title: PropTypes.node,

  /** subtitle of main message */
  content: PropTypes.node,

  /** format body content */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
}
