import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { Link as GLink } from 'gatsby'
import GImage from 'gatsby-image'
import {
  Container,
  Input,
  Menu
} from 'semantic-ui-react'

import { calcDuration } from '../utils'

import './Navigation.scss'

// REVIEW: add sticky header?
const Navigation = ({
  pages,
  logo,
  logoAlt,
  anchor,
  size,
  search,
  centered
}) => (
  <Container textAlign={centered ? 'center' : undefined}>
    <Menu id='nav' size={size} compact text secondary>
      {logo && (
        <Menu.Item
          // TODO: method to prevent unnecessary import
          as={!anchor ? GLink : Link}
          to={!anchor ? '/' : ''}
          key='logo'
          spy
          smooth
          duration={calcDuration}
          tabIndex='0'
          name=''
        >
          <GImage fixed={logo} alt={logoAlt} className='logo' />
        </Menu.Item>
      )}

      {pages.map(page => (
        <Menu.Item
          as={!anchor ? GLink : Link}
          to={`${!anchor ? '/' : ''}${page.toLowerCase().replace(' ', '-')}`}
          key={`${page.toLowerCase().replace(' ', '-')}`}
          spy
          smooth
          duration={calcDuration}
          tabIndex='0'
          name={page}
        />
      ))}

      {search && (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search Properties...' />
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  </Container>
)

Navigation.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  logoAlt: PropTypes.string,
  anchor: PropTypes.bool,
  size: PropTypes.string,
  search: PropTypes.bool,
  centered: PropTypes.bool,
  pages: PropTypes.arrayOf(PropTypes.string)
}

Navigation.defaultProps = {
  logo: null,
  logoAlt: '',
  anchor: true,
  size: 'large',
  search: false,
  centered: false,
  pages: []
}

export default Navigation
