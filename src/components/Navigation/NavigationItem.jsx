import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { Menu } from "semantic-ui-react"

import { Link } from "../Link"

import { media } from "../../utils"

const S = {} // styled-components namespace

S.Item = styled(Menu.Item)`
  ${({ $pointing }) =>
    $pointing &&
    css`
      border-bottom: 2px solid rgba(34, 36, 38, 0.15);

      &.active {
        border-bottom: 2px solid #1b1c1d;
      }

      /* remove rounded edge that distorts underline */
      &:last-child {
        border-radius: 0;
      }

      /* mix primary menu w secondary menu style */
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `};

  /* REVIEW: report bug when placing this block before the prev */
  @media ${media.phone} {
    a {
      /*       font-size: 0.97rem; */
    }
  }
`

const NavigationItem = ({
  as = "a",
  link = "",
  stacked = false,
  pointing = false,
  children,
  ...rest
}) => (
  <Link
    onClick={(e) => e.currentTarget.blur()} // prevent keeping focus after navigating to new page
    as={as}
    forwarded // prevent getting caught by styled component `S.Item`
    link={link}
    {...rest}
  >
    <S.Item $pointing={pointing}>{children}</S.Item>
  </Link>
)

NavigationItem.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
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
   * primary content, usually string, used as link if link not provided
   */
  children: PropTypes.node,
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link: PropTypes.string,
  /**
   * formatted with active indicator
   */
  pointing: PropTypes.bool,
  /**
   * required to support stacking logo
   */
  stacked: PropTypes.bool,
}

export { NavigationItem }
