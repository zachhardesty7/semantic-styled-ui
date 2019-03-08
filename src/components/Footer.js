import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Grid,
  Ref,
  Segment
} from 'semantic-ui-react'

import {
  applyTag,
  getBackgroundColor,
  getColor,
  getHoverColor,
  withNewProps,
  withoutProps
} from '../utils'

const FilteredBottomBar = applyTag(withoutProps(Segment, ['color', 'backgroundColor']))
const BottomBar = styled(FilteredBottomBar)`
  margin-top: 0px;
  ${getColor('light')}
  ${getBackgroundColor('primary')}
`

const Link = styled.a`
  text-decoration: underline;
  ${getColor('light')}
  ${getHoverColor('white')}
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
  developerLink,
  className
}) => {
  const con = useRef()

  // update parent containers to allow dynamic sized footer
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
  })

  return (
    // NOTE: unsure why this was changed in "semantic-ui-react": "0.85.0"
    // source code seems to indicate it should evaluate to .FindNode regardless
    // but compiler indicates that it's attempting to ref a func component
    // https://github.com/Semantic-Org/Semantic-UI-React/pull/3405/commits/d6f29a9f515cfe48628e90af7311c9f823beef7a
    <Ref.FindNode innerRef={con}>
      <BottomBar
        tag='footer'
        color={color}
        backgroundColor={backgroundColor}
        className={className}
      >
        <Container>
          <Grid columns={2} verticalAlign='middle'>
            {separated ? (
              <>
                <Grid.Column width={8}>
                  {`copyright © ${copyright}`}
                </Grid.Column>
                <Grid.Column width={8} textAlign='right'>
                  {'designed and developed by '}
                  <Link href={developerLink}>{developerName}</Link>
                </Grid.Column>
              </>
            ) : (
              <>
                <Grid.Column width={12}>
                  <div>
                    {`copyright © ${copyright}`}
                    {stacked ? <br /> : ' | '}
                    {'designed and developed by '}
                    <Link href={developerLink}>{developerName}</Link>
                  </div>
                </Grid.Column>
                <Grid.Column width={4} textAlign='right'>
                  <Container>
                    {React.Children.map(icons, Child => (
                      withNewProps(Child, { color, hoverColor, inverted })
                    ))}
                  </Container>
                </Grid.Column>
              </>
            )}
          </Grid>
        </Container>
      </BottomBar>
    </Ref.FindNode>
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
  icons: PropTypes.node,
  inverted: PropTypes.bool,
  sticky: PropTypes.bool,
  copyright: PropTypes.string,
  className: PropTypes.string
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
  copyright: '',
  className: ''
}

export default React.memo(Footer)
