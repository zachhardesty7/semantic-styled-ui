import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import {
  Container, Grid
} from 'semantic-ui-react'

import SocialMediaIcons from './SocialMediaIcons'
import './Footer.scss'


const Footer = ({
  sticky,
  copyright,
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
    <div className='ui inverted vertical segment' id='bottom-bar' ref={con}>
    <Container>
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column id='attribution' width={12}>
          {`copyright© ${copyright} | designed and developed by `}
          <a href={developerLink}>{developerName}</a>
        </Grid.Column>
        <Grid.Column width={4} id='bottom-bar-icons' floated='right' textAlign='right'>
          <SocialMediaIcons
            inverted={inverted}
            icons={icons}
          />
        </Grid.Column>
      </Grid>
    </Container>
    </div>
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
