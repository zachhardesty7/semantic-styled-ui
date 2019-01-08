import React from 'react'
import PropTypes from 'prop-types'

import { Navigation, Footer } from '../components'

import './Template.scss'

import logo from '../../static/gulf-corp-navy.png'

const Template = ({ children }) => (
  <React.Fragment>
    <Navigation
      logo={logo}
      stackedLogo
      logoAlt='logo'
      anchor={false}
      centered
      pages={['About', 'Portfolio', 'Contact']}
    />
    {children}
    <Footer
      inverted
      icons={[
        {
          name: 'Facebook',
          link: 'https://www.facebook.com/gulfcorp/'
        },
        {
          name: 'Twitter',
          link: 'https://twitter.com/gulfcorp/'
        },
        {
          name: 'Instagram',
          link: 'https://instagram.com/gulfcorp/'
        },
        {
          name: 'Linkedin',
          link: 'https://www.linkedin.com/company/gulfcorp/'
        }
      ]}
      copyright='Gulf Corp'
      developerName='Zach Hardesty'
      developerLink='https://zachhardesty.com'
    />
  </React.Fragment>
)

Template.propTypes = {
  children: PropTypes.element
}

Template.defaultProps = {
  children: null
}

export default Template
