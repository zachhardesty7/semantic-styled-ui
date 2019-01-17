import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container, Grid
} from 'semantic-ui-react'

import SocialMediaIcons from './SocialMediaIcons'
import theme from '../theme'

const BottomBar = styled.div`
  background-color: ${theme.primary};
`

const Left = styled(Grid.Column)`
  background-color: ${theme.primary};
  color: ${theme.light};
  align-self: center;

  a {
    color: ${theme.light};
    text-decoration: underline;

    &:hover {
      color: ${theme.white};
    }
  }
`

const Right = styled(Grid.Column)`
  padding-top: 1.5em;
`

const Footer = ({
  sticky,
  copyright,
  stacked,
  inverted,
  icons,
  developerName,
  developerLink
}) => {
  const con = useRef()

  // update higher up containers to allow dynamic sized footer
  // that stays at the bottom, even when there's little content
  useLayoutEffect(() => {
    if (sticky) {
      let el = con.current.parentNode

      el.children[el.children.length - 2].style.flex = '1 0 auto'
      el.style.display = 'flex'
      el.style.flexDirection = 'column'

      while (el.parentNode) {
        el.style.minHeight = '100vh'
        el = el.parentNode
      }
    }
  }, [con]) // prevents styling on re-renders

  return (
    // REVIEW: override semantic ui component?
    // Semantic UI does not support passing thru ref
    // param to children. using a div to simulate segment
    // <Segment inverted vertical id='bottom-bar'>
    <BottomBar className='ui inverted vertical segment' ref={con}>
      <Container>
        <Grid columns={2} verticalAlign='middle'>
          <Left width={12}>
            <div>
              {`copyright© ${copyright}`}
              {stacked ? <br /> : ' | '}
              {'designed and developed by '}
              <a href={developerLink}>{developerName}</a>
            </div>
          </Left>
          <Right width={4} floated='right' textAlign='right'>
            <SocialMediaIcons
              inverted={inverted}
              icons={icons}
            />
          </Right>
        </Grid>
      </Container>
    </BottomBar>
  )
}

Footer.propTypes = {
  developerName: PropTypes.string,
  developerLink: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string
    })
  ),
  inverted: PropTypes.bool,
  sticky: PropTypes.bool,
  copyright: PropTypes.string
}

Footer.defaultProps = {
  developerName: '',
  developerLink: '',
  icons: [],
  inverted: false,
  sticky: true,
  copyright: ''
}

export default Footer
