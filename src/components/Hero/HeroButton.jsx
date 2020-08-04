import React from "react"
import styled from "styled-components"

import { Button } from "semantic-ui-react"

import { IconLink } from "../IconLink"
import { Link } from "../Link"

import {
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
} from "../../utils"

const S = {} // styled-components namespace

S.Button = styled(Button)`
  display: inline-flex;
  align-items: center;
  margin-right: 0;
  ${getColor("white")};
  ${getBackgroundColor("secondary")};
  transition: ease-in-out 50ms;

  ${getHoverBackgroundColor("primary")};
  &:hover {
    transition: ease-in-out 100ms;
  }
`

S.IconLink = styled(IconLink)`
  ${getColor("white")};
  ${({ $pointing }) => `margin-${$pointing}: .75em`};
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

export const HeroButton = ({
  as = "a",
  link = "",
  pointing = "right",
  compact = false,
  size = "big",
  color = "",
  colorHover = "",
  children,
  ...rest
}) => (
  <Link as={as} forwarded link={link} {...rest}>
    <S.Button
      primary
      size={size}
      compact={compact}
      $backgroundColor={color}
      $backgroundColorHover={colorHover}
    >
      {pointing === "left" && (
        <S.IconLink $pointing="right" name="angle left" />
      )}
      {children}
      {pointing === "right" && (
        <S.IconLink $pointing="left" name="angle right" />
      )}
    </S.Button>
  </Link>
)
