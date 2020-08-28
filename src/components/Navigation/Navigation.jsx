import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { Container, Menu, Segment } from "semantic-ui-react"

import {
  flexAlignMap,
  margin,
  media,
  padding,
  withNewProps,
  withTag,
} from "../../utils"

import { NavigationItem } from "./NavigationItem"
import { NavigationLogo } from "./NavigationLogo"

const S = {} // styled-components namespace

// TODO: https://react.semantic-ui.com/collections/menu/#types-attached
S.Segment = styled(Segment)`
  ${({ $pointing }) => $pointing && padding("bottom")("0")};
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
  ${({ pointing }) => pointing && margin("bottom")("2px")};

  ${({ pointing, $floating }) => pointing && $floating && "border: none"};
`

S.SubMenu = styled(Menu.Menu)`
  flex-wrap: wrap;
  justify-content: center;
`

// TODO: add sticky header
const Navigation = ({
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
      $justify={justify}
      $floating={floating}
      $split={split}
      {...rest}
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

Navigation.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them, edit the d.ts file and run any "yarn build"    |
  // ----------------------------------------------------------------------
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      childContextTypes: PropTypes.object,
      contextType: PropTypes.shape({
        Consumer: PropTypes.func.isRequired,
        displayName: PropTypes.string,
        Provider: PropTypes.func.isRequired,
      }),
      contextTypes: PropTypes.object,
      defaultProps: PropTypes.object,
      displayName: PropTypes.string,
      getDerivedStateFromError: PropTypes.func,
      getDerivedStateFromProps: PropTypes.func,
      propTypes: PropTypes.object,
    }),
  ]),
  /**
   * collection of items to render as menu
   */
  children: PropTypes.node,
  /**
   * elevate nav to sit on top of underlying container
   */
  floating: PropTypes.bool,
  /**
   * allow content to reach the edges of the parent
   */
  fullWidth: PropTypes.bool,
  /**
   * flip the colors for display on a light colored background
   */
  inverted: PropTypes.bool,
  /**
   * horizontal position
   */
  justify: PropTypes.any,
  /**
   * don't indicate active page
   */
  noPointing: PropTypes.bool,
  /**
   * increase prominence
   */
  primary: PropTypes.bool,
  /**
   * increase whitespace
   */
  relaxed: PropTypes.bool,
  /**
   * size using "em" units
   */
  size: PropTypes.oneOf(["huge", "large", "massive", "mini", "small", "tiny"]),
  /**
   * put all space between children
   *
   * **NOTE:** only works with 2 items
   */
  split: PropTypes.bool,
  /**
   * format to be used with text items
   */
  text: PropTypes.bool,
  /**
   * horizontal position
   */
  textAlign: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
}

export { Navigation }

Navigation.Left = withTag("SSUI", ({ children, ...rest }) => (
  <S.SubMenu>
    {React.Children.map(children, (Child) => withNewProps(Child, rest))}
  </S.SubMenu>
))

Navigation.Right = withTag("SSUI", ({ children, ...rest }) => (
  <S.SubMenu>
    {React.Children.map(children, (Child) => withNewProps(Child, rest))}
  </S.SubMenu>
))

Navigation.Item = withTag("SSUI", NavigationItem)
Navigation.Logo = withTag("SSUI", NavigationLogo)
