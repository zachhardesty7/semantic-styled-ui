import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'

import { Hero, Blurbs } from '../components'
import 'semantic-ui-css/semantic.min.css'
import Template from '../Template'
import theme from '../theme'

import baylor from '../../static/baylor.jpg'

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    font-size: 1em;
    line-height: 1.65;
    color: ${theme.dark};
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    font-size: 2em;
    font-weight: normal;
  }

  a {
    color: ${theme.secondary};
    &:hover {
      color: ${theme.white};
    }
  }
`

const RootIndex = ({ data }) => (
  <Template>
    <GlobalStyle />
    <Hero
      background={baylor}
      title='Gulf Corp'
      subtitle='A Mississippi Company'
      buttonText='Check Out Our Work'
      buttonProps={{
        as: Link,
        to: '/portfolio/'
      }}
    />
    <Blurbs
      title='About Us'
      color={theme.blue}
      content='Gulf Corp is a privately held, full-service real estate development and investment company focusing on the development of customized real property. A leader in commercial development across the southeastern US, Gulf’s services include development, acquisition, and financing. The Gulf Team consists of highly experienced professionals who have committed the entirety of their careers to the planning, financing, delivery and disposition of Office, Industrial, Healthcare, and Retail projects. The company’s unique blend of experience and skill sets provides the knowledge and expertise to solve any real estate challenges in a variety of markets and environments.'
      blurbs={[{
        title: 'Development',
        content: 'Our mission is your mission. We work with our customers to plan out a truly unique final product that fits your individual specifications.',
        icon: 'cog'
      },
      {
        title: 'Acquisition',
        content: 'We are there with every step of the way. We are experts at taking a plan to a completed project.',
        icon: 'cubes'
      },
      {
        title: 'Financing',
        content: 'We negotiate on your behalf. Our customers are our top priority and get the best rates in the industry.',
        icon: 'hand-holding-usd'
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
