import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from 'semantic-ui-react'
import { Title } from '../Title'

// TODO: test mobile, may need `container` on `Grid`
export const Section404 = ({
  title = '404: Missing Page Error',
  content = 'You\'ve arrived at an invalid URL. We apologize for the inconvenience!',
  textAlign = 'center',
  ...rest
}) => (
  <Grid textAlign={textAlign} verticalAlign='middle' {...rest}>
    <Grid.Column>
      <Title subtitle={content}>{title}</Title>
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
