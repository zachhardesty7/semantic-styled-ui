import React from "react"
import styled, { css } from "styled-components"

import { Container, Menu, Segment } from "semantic-ui-react"

import { flexAlignMap, media, withNewProps } from "../../utils"

import { NavigationItem } from "./NavigationItem"
import { NavigationLogo } from "./NavigationLogo"

const S = {} // styled-components namespace

// TODO: https://react.semantic-ui.com/collections/menu/#types-attached
S.Segment = styled(Segment)`
  ${({ $pointing }) => $pointing && "padding-bottom: 0"};
  ${({ $floating, $relaxed }) =>
    $floating &&
    css`
      position: absolute;
      z-index: 1000;
      width: 100%;
      background-color: #ffffff00;
      padding: ${$relaxed ? "1em 1.5em" : "0em"};
    `};
`

S.Menu = styled(Menu)`
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
  flex-wrap: wrap;

  &:after {
    display: none;
  }

  ${({ $split }) => $split && "justify-content: space-between"};

  @media ${media.mobile} {
    justify-content: center;
  }

  ${({ pointing }) => pointing && "& .item { border-radius: 0px }"};

  ${({ pointing }) => pointing && "border-bottom: none"};
  ${({ pointing }) => pointing && "margin-bottom: 2px"};

  ${({ pointing, $floating }) => pointing && $floating && "border: none"};
`

S.SubMenu = styled(Menu.Menu)`
  flex-wrap: wrap;
  justify-content: center;
`

// TODO: add sticky header
export const Navigation = ({
  as = "a",
  size,
  text = false,
  relaxed = false,
  primary = false,
  noPointing = false,
  textAlign = "center",
  justify = "center",
  inverted = false,
  fullWidth = false,
  split = false,
  floating = false,
  children = null,
  ...rest
}) =>
  fullWidth || !split ? (
    <S.Menu
      forwardedAs="nav"
      size={size}
      text={text}
      secondary={!primary}
      pointing={!noPointing}
      inverted={inverted}
      $floating={floating}
      $split={split}
    >
      {/* apply tag && pointing to all children */}
      {React.Children.map(children, (Child) =>
        withNewProps(Child, { forwardedAs: as, pointing: !noPointing })
      )}
    </S.Menu>
  ) : (
    <Container textAlign={textAlign}>
      <S.Menu
        forwardedAs="nav"
        size={size}
        text={text}
        compact={!relaxed}
        secondary={!primary}
        pointing={!noPointing}
        inverted={inverted}
        $floating={floating}
      >
        {/* apply tag && pointing to all children */}
        {React.Children.map(children, (Child) =>
          withNewProps(Child, { forwardedAs: as, pointing: !noPointing })
        )}
      </S.Menu>
    </Container>
  )

Navigation.Left = ({ children, ...rest }) => (
  <S.SubMenu>
    {React.Children.map(children, (Child) => withNewProps(Child, rest))}
  </S.SubMenu>
)
Navigation.Right = ({ children, ...rest }) => (
  <S.SubMenu>
    {React.Children.map(children, (Child) => withNewProps(Child, rest))}
  </S.SubMenu>
)

Navigation.Item = NavigationItem
Navigation.Logo = NavigationLogo
