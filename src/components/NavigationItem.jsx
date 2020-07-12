import React from "react"
import styled, { css } from "styled-components"

import { Menu } from "semantic-ui-react"

import { Link } from "./Link"

import { media } from "../utils"

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
      font-size: 0.97rem;
    }
  }
`

export const NavigationItem = ({
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
