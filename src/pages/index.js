import React from 'react'
import PropTypes from 'prop-types'

import { Hero, Blurbs } from '../components'
import 'semantic-ui-css/semantic.min.css'
import Template from '../Template'
import theme from '../theme'

import baylor from '../../static/baylor.jpg'

const RootIndex = ({ data }) => (
  <Template>
    <Hero
      background={baylor}
      title='Gulf Corp'
      subtitle='A Mississippi Company'
    />
    <Blurbs
      color={theme.blue}
      blurbs={[{
        title: 'Development',
        content: 'PLACEHOLDER: Our mission is your mission. We work with our customers to plan out a truly unique final product that fits your individual specifications.',
        icon: 'cog'
      },
      {
        title: 'Investment',
        content: 'PLACEHOLDER: We are there with every step of the way. We are experts at taking a plan to a completed project.',
        icon: 'dollar-sign'
      },
      {
        title: 'Construction',
        content: 'PLACEHOLDER: We negotiate on your behalf. Our customers are our top priority and get the best rates in the industry.',
        icon: 'city'
      }]}
    />
  </Template>
)

RootIndex.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

RootIndex.defaultProps = {
  data: {}
}

export default RootIndex
