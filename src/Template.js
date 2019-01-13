import React from 'react'
import PropTypes from 'prop-types'

import { Navigation, Footer } from './components'

import logo from '../static/gulf-corp-navy.png'

const Template = ({ children }) => (
  <div className='root'>
    <Navigation
      logo={logo}
      stackedLogo
      largeLogo
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
          link: ''
        },
        {
          name: 'Twitter',
          link: ''
        },
        {
          name: 'Instagram',
          link: ''
        },
        {
          name: 'Linkedin',
          link: ''
        }
      ]}
      copyright='Gulf Corp: A Mississippi Company'
      developerName='Zach Hardesty'
      developerLink='https://zachhardesty.com'
    />
  </div>
)

Template.propTypes = {
  children: PropTypes.element
}

Template.defaultProps = {
  children: null
}

export default Template
