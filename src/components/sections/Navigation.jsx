import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Container, Menu, Segment } from 'semantic-ui-react'
import { NavigationItem } from '../NavigationItem'
import { NavigationLogo } from '../NavigationLogo'

import { withNewProps } from '../../utils'

const S = {} // styled-components namespace

S.Segment = styled(Segment)`
  ${({ $textAlign }) => $textAlign && 'justify-content: left'};

  ${({ $pointing }) => $pointing && 'padding-bottom: 0'};
  ${({ $floating, $relaxed }) => $floating && css`
    position: absolute;
    z-index: 1000;
    width: 100%;
    background-color: #ffffff00;
    padding: ${$relaxed ? '1em 1.5em' : '0em'};
  `};
`

S.Menu = styled(Menu)`
  flex-wrap: wrap;
  justify-content: center;

  ${({ pointing }) => pointing && '& .item { border-radius: 0px }'};

  ${({ pointing }) => pointing && 'border-bottom: none'};
  ${({ pointing }) => pointing && 'margin-bottom: 2px'};

  ${({ pointing, $floating }) => pointing && $floating && 'border: none'};
`

// TODO: add sticky header
export const Navigation = ({
  as = 'a',
  size = undefined,
  text = false,
  relaxed = false,
  primary = false,
  noPointing = false,
  textAlign = 'center',
  inverted = false,
  fullWidth = false,
  floating = false,
  children = null,
  ...rest
}) => (
  <S.Segment
    forwardedAs='header'
    $pointing={!noPointing}
    $floating={floating}
    $relaxed={relaxed}
    basic
    vertical
    {...rest}
  >
    {fullWidth ? (
      <S.Menu
        forwardedAs='nav'
        size={size}
        text={text}
        secondary={!primary}
        pointing={!noPointing}
        inverted={inverted}
        $floating={floating}
      >
        {/* apply tag && pointing to all children */}
        {React.Children.map(children,
          (Child) => withNewProps(Child, { forwardedAs: as, pointing: noPointing }))}
      </S.Menu>
    ) : (
      <Container textAlign={textAlign}>
        <S.Menu
          forwardedAs='nav'
          size={size}
          text={text}
          compact={!relaxed}
          secondary={!primary}
          pointing={!noPointing}
          inverted={inverted}
          $floating={floating}
        >
          {/* apply tag && pointing to all children */}
          {React.Children.map(children,
            (Child) => withNewProps(Child, { forwardedAs: as, pointing: noPointing }))}
        </S.Menu>
      </Container>
    )}
  </S.Segment>
)

Navigation.propTypes = {
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   *
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /** size using "em" units */
  size: PropTypes.oneOf(['small', 'tiny', 'mini', 'large', 'huge', 'massive']),

  /** format to be used with text items */
  text: PropTypes.bool,

  /** increase whitespace */
  relaxed: PropTypes.bool,

  /** increase prominence */
  primary: PropTypes.bool,

  /** don't indicate active page */
  noPointing: PropTypes.bool,

  /** flip the colors for display on a light colored background */
  inverted: PropTypes.bool,

  /** allow content to reach the edges of the parent */
  fullWidth: PropTypes.bool,

  /** elevate nav to sit on top of underlying container */
  floating: PropTypes.bool,

  /** horizontal position */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

  /** collection of items to render as menu */
  children: PropTypes.node,
}

Navigation.Left = ({ children, ...rest }) => <Menu.Menu {...rest} position='left'>{children}</Menu.Menu>
Navigation.Right = ({ children, ...rest }) => <Menu.Menu {...rest} position='right'>{children}</Menu.Menu>

Navigation.Item = NavigationItem
Navigation.Logo = NavigationLogo
