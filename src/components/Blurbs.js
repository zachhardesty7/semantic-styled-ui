import React from 'react'
import Async from 'react-promise'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Grid,
  Container,
  Segment,
  Header
} from 'semantic-ui-react'

import { Blurb } from '.'

import './Blurbs.scss'

import { toJoinedTitleCase } from '../utils'

const Blurbs = ({
  title,
  content,
  color,
  blurbs
}) => (
  <Segment vertical basic secondary className='blurbs'>
    <Container className='blurbs-header' text>
      <Header as='h3' textAlign='center'>{title}</Header>
      {content && (
        <Header.Content>{content}</Header.Content>
      )}
    </Container>
    <Container className='blurbs-body'>
      <Grid relaxed stackable columns={blurbs.length} divided padded>
        {blurbs.map(blurb => (
          <Async
            key={toJoinedTitleCase(blurb.title)}
            promise={import('@fortawesome/free-solid-svg-icons')}
            then={icon => (
              <Grid.Column>
                <Blurb
                  icon={<FontAwesomeIcon icon={icon[`fa${toJoinedTitleCase(blurb.icon)}`]} size='3x' color={color} />}
                  header={blurb.title}
                  headerAs='h4'
                  content={blurb.content}
                />
              </Grid.Column>
            )}
          />
        ))}
      </Grid>
    </Container>
  </Segment>
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
