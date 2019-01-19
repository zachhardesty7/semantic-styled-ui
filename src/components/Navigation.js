import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import styled from 'styled-components'
import {
  Container,
  Input,
  Menu
} from 'semantic-ui-react'

import { calcDuration } from '../utils'

const logoSizes = {
  small: '90px',
  base: '155px',
  big: '215px'
}

// TODO: split into to separate styled components
const NavMenu = styled(Menu)`
  margin-top: 1em;
  /* margin-bottom: 1em; */ /* REVIEW: */
  margin-bottom: 2px; /* when center aligned */
  flex-wrap: wrap;
  justify-content: center;

  /* apply border to individual items instead of menu con */
  border-bottom: none;
  .item.item {
    border-bottom: 2px solid rgba(34,36,38,.15);

    &.active {
      border-bottom: 2px solid #1b1c1d;
    }

    /* remove rounded edge that distorts underline */
    &:last-child {
      border-radius: 0;
    }

    /* mix primary menu w secondary menu style */
    &:hover {
      background-color: rgba(0,0,0,.05);
    }
  }

  /* TODO: split out */
  /* set stacked logo spacing & remove underline */
  .logo-item-stacked.logo-item-stacked {
    border-bottom: none;
    margin-right: 50%;
    margin-left: 50%;
  }

  .logo {
    margin-right: 0.5em;
    min-width: ${({ logoSize }) => logoSizes[logoSize]};

    /* reset weird behavior in gatsby */
    img {
      display: inherit;
      vertical-align: inherit;
      margin: inherit;
      width: inherit;
    }
  }
`

// TODO: add sticky header
// TODO: consider utilizing gatsby-source-filesystem for src url
// TEST: various interactions of props
const Navigation = ({
  pages,
  logo,
  logoSize,
  logoAlt,
  stackedLogo,
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
      <NavMenu logoSize={logoSize} size={size} compact secondary pointing>
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
                className={stackedLogo ? 'logo-item-stacked' : null}
                activeClassName={stackedLogo ? null : 'active'}
              >
                {typeof logo !== 'string'
                  // REVIEW: ahead of its time, assumes UI can be decoupled from Gatsby
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

        {search && ( // TEST: needs testing
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search Properties...' />
            </Menu.Item>
          </Menu.Menu>
        )}
      </NavMenu>
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
  stackedLogo: PropTypes.bool,
  logoSize: PropTypes.string,
  anchor: PropTypes.bool,
  size: PropTypes.string,
  search: PropTypes.bool,
  centered: PropTypes.bool,
  pages: PropTypes.arrayOf(PropTypes.string)
}

Navigation.defaultProps = {
  logo: null,
  logoAlt: '',
  stackedLogo: false,
  logoSize: 'base',
  anchor: true,
  size: 'large',
  search: false,
  centered: false,
  pages: []
}

export default Navigation
