import React from 'react'
import styled, { css } from 'styled-components'

import { Container, Menu, Segment } from 'semantic-ui-react'
import { NavigationItem } from '../NavigationItem'
import { NavigationLogo } from '../NavigationLogo'

import { withNewProps } from '../../utils'

const S = {} // styled-components namespace

S.Segment = styled(Segment)`
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
          (Child) => withNewProps(Child, { forwardedAs: as, pointing: !noPointing }))}
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
            (Child) => withNewProps(Child, { forwardedAs: as, pointing: !noPointing }))}
        </S.Menu>
      </Container>
    )}
  </S.Segment>
)

Navigation.Left = ({ children, ...rest }) => (
  <Menu.Menu position='left'>
    {React.Children.map(children,
      (Child) => withNewProps(Child, rest))}
  </Menu.Menu>
)
Navigation.Right = ({ children, ...rest }) => (
  <Menu.Menu position='right'>
    {React.Children.map(children,
      (Child) => withNewProps(Child, rest))}
  </Menu.Menu>
)

Navigation.Item = NavigationItem
Navigation.Logo = NavigationLogo
