import React from "react"
import styled, { css } from "styled-components"

import { Container, Grid, Header, Item, Segment } from "semantic-ui-react"
import { Blurb } from "./Blurb"

import {
  padding as getPadding,
  margin,
  media,
  withNewProps,
  withTag,
} from "../../utils"

const S = {} // styled-components namespace

const MAX_COLUMNS = 4

/* fix absurdly wide blurb segments on tablet size */
/* use "!important" to override .ui.text.container */
S.Blurbs = styled(Segment)`
  ${({ $padded }) =>
    ($padded === "top" && getPadding("top")) ||
    ($padded === "bottom" && getPadding("bottom")) ||
    ($padded && getPadding("vertical"))};
`

/* pad between title/content and items */
S.Header = styled(Container)`
  ${getPadding("bottom")("2.75em", ["!"])};
`

S.Title = styled(Header).attrs({ forwardedAs: "h2" })`
  @media ${media.phone} {
    text-align: left;
  }
`

S.Content = styled(Header.Content)`
  text-align: ${({ $centered }) => $centered && "justify"};
`

S.Grid = styled(Grid)`
  ${({ $fullWidth }) =>
    $fullWidth === "gutter" &&
    css`
      @media ${media.laptop} {
        flex-wrap: nowrap;
      }
      @media ${media.desktop} {
        flex-wrap: nowrap;
      }
      @media ${media.widescreen} {
        flex-wrap: nowrap;
      }
    `};
`

S.GridCol = styled(Grid.Column)`
  ${({ $fullWidth }) =>
    $fullWidth === "gutter" &&
    css`
      ${margin("horizontal")("10px")};

      &:last-of-type {
        ${margin("right")("20px")};
      }
      &:first-of-type {
        ${margin("left")("20px")};
      }
    `};

  @media ${media.laptop} {
    box-shadow: none;
  }
  @media ${media.mobile} {
    ${getPadding("horizontal")("0")};
    ${getPadding("vertical")("2em", ["internal", "!"])};
    ${getPadding("vertical")("0", ["external", "!"])};
  }
`

S.ItemGroup = styled(Item.Group)`
  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 700px !important;
      @media ${media.laptop} {
        flex-wrap: nowrap;
      }
      @media ${media.desktop} {
        flex-wrap: nowrap;
      }
      @media ${media.widescreen} {
        flex-wrap: nowrap;
      }
    `};
`

export const Blurbs = ({
  title,
  content,
  fullWidth = false,
  centered = false,
  color = "",
  secondary = false,
  padded = false,
  padding = "relaxed",
  vertical = false,
  children,
  ...rest
}) => (
  <S.Blurbs
    $padded={padded}
    padding={padding}
    forwardedAs="section"
    vertical
    basic
    secondary={secondary}
    {...rest}
  >
    {(title || content) && (
      <S.Header>
        {title && (
          <S.Title textAlign={centered ? "center" : undefined}>{title}</S.Title>
        )}
        {content && <S.Content $centered={centered}>{content}</S.Content>}
      </S.Header>
    )}

    {/* TODO: support remaining props */}
    {vertical ? (
      <S.ItemGroup relaxed divided>
        {React.Children.map(children, (blurb) =>
          withNewProps(blurb, {
            color: color || undefined,
            vertical: vertical || undefined,
          })
        )}
      </S.ItemGroup>
    ) : (
      <S.Grid
        columns={Math.min(React.Children.count(children), MAX_COLUMNS)}
        relaxed
        doubling
        stackable
        divided={React.Children.count(children) <= MAX_COLUMNS || undefined}
        $fullWidth={fullWidth}
      >
        {React.Children.map(children, (blurb) => (
          <S.GridCol $fullWidth={fullWidth}>
            {withNewProps(blurb, {
              color: color || undefined,
              vertical: vertical || undefined,
            })}
          </S.GridCol>
        ))}
      </S.Grid>
    )}
  </S.Blurbs>
)

Blurbs.Item = withTag("SSUI", Blurb)
