import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import {
  Container,
  Input,
  Menu
} from 'semantic-ui-react'

import { calcDuration } from '../utils'

import './Navigation.scss'

// TODO: add sticky header
// TODO: consider utilizing gatsby-source-filesystem for src url
const Navigation = ({
  pages,
  logo,
  logoAlt,
  anchor,
  size,
  search,
  centered
}) => {
  const linkPromise = !anchor
    ? import('gatsby')
    : import('react-scroll')

  return (
    <Container textAlign={centered ? 'center' : undefined}>
      <Menu id='nav' size={size} compact secondary pointing>
        {logo && (
          <Async
            promise={linkPromise}
            then={({ Link }) => (
              <Menu.Item
                as={Link}
                to='/'
                key='logo'
                spy={anchor ? true : null}
                smooth={anchor ? true : null}
                duration={anchor ? calcDuration : null}
                tabIndex='0'
                name='home'
                activeClassName='active'
              >
                {typeof logo !== 'string'
                  ? (
                    <Async
                      promise={import('gatsby-image')}
                      then={({ GatsbyImage }) => <GatsbyImage fixed={logo} alt={logoAlt} className='logo' />}
                    />
                  )
                  : <img src={logo} alt={logoAlt} className='logo' />
                }
              </Menu.Item>
            )}
          />

        )}

        {pages.map(page => (
          <Async
            key={`${page.toLowerCase().replace(' ', '-')}`}
            promise={linkPromise}
            then={({ Link }) => (
              <Menu.Item
                as={Link}
                to={`${page.toLowerCase().replace(' ', '-')}`}
                spy={anchor ? true : null}
                smooth={anchor ? true : null}
                duration={anchor ? calcDuration : null}
                tabIndex='0'
                name={page}
                activeClassName='active'
              />
            )}
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
}

Navigation.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element, // REVIEW: don't think this works
    PropTypes.object,
    PropTypes.string
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
