import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Container,
  Grid,
  Ref,
  Segment
} from 'semantic-ui-react'
import SocialMediaIcons from './SocialMediaIcons'
import theme from '../theme'

const BottomBar = styled(Segment)`
  color: ${({ color }) => color || theme.light};
  background-color: ${({ backgroundColor }) => backgroundColor || theme.primary};
`

const Left = styled(Grid.Column)`
  align-self: center;
`

const FilteredRight = ({ separated, children, ...rest }) => (
  <Grid.Column {...rest}>{children}</Grid.Column>
)
const Right = styled(FilteredRight)`
  padding-top: ${({ separated }) => !separated && '1.5em'};
`

const Link = styled.a`
  color: ${({ color }) => color || theme.light};
  text-decoration: underline;
  &:hover {
    color: ${({ hoverColor }) => hoverColor || theme.white};
  }
`

const Footer = ({
  color,
  backgroundColor,
  hoverColor,
  sticky,
  copyright,
  stacked,
  separated,
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
  }, [con])

  return (
    <Ref innerRef={con}>
      <BottomBar>
        <Container>
          <Grid columns={2} verticalAlign='middle'>
            {separated
              ? (
                <>
                  <Left width={8}>
                    {`copyright © ${copyright}`}
                  </Left>
                  <Right separated={separated} width={8} floated='right' textAlign='right'>
                    {'designed and developed by '}
                    <Link href={developerLink}>{developerName}</Link>
                  </Right>
                </>
              ) : (
                <>
                  <Left width={12}>
                    <div>
                      {`copyright © ${copyright}`}
                      {stacked ? <br /> : ' | '}
                      {'designed and developed by '}
                      <a href={developerLink}>{developerName}</a>
                    </div>
                  </Left>
                  <Right separated={separated} width={4} floated='right' textAlign='right'>
                    <SocialMediaIcons
                      inverted={inverted}
                      icons={icons}
                    />
                  </Right>
                </>
              )
            }
          </Grid>
        </Container>
      </BottomBar>
    </Ref>
  )
}

Footer.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  stacked: PropTypes.bool,
  separated: PropTypes.bool,
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
  color: '',
  backgroundColor: '',
  hoverColor: '',
  stacked: false,
  separated: false,
  developerName: '',
  developerLink: '',
  icons: [],
  inverted: false,
  sticky: true,
  copyright: ''
}

export default React.memo(Footer)
