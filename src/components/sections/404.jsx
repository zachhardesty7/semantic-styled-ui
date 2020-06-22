import React from 'react'
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
      <Title subtitle={content} textAlignBody='center'>{title}</Title>
    </Grid.Column>
  </Grid>
)
