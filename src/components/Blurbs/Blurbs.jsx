import React from "react"
import styled, { css } from "styled-components"

import { Container, Grid, Header, Item, Segment } from "semantic-ui-react"
import { Blurb } from "./Blurb"
import { Flexbox } from "../Flexbox"

import { media, spacingMap, withNewProps } from "../../utils"

const S = {} // styled-components namespace

const MAX_COLUMNS = 4

/* fix absurdly wide blurb segments on tablet size */
/* use "!important" to override .ui.text.container */
S.Blurbs = styled(Segment)`
  ${({ $padded, padding }) =>
    ($padded === "top" && `padding-top: ${spacingMap[padding]}`) ||
    ($padded === "bottom" && `padding-bottom: ${spacingMap[padding]}`) ||
    ($padded && `padding: ${spacingMap[padding]} 0`)};

  @media ${media.tablet} {
    .container:not(.fluid) {
      max-width: 397px !important;
      /*       padding: 0 1.5em; */
      margin: 0 auto !important;
    }
  }

  @media ${media.phone} {
    .container:not(.fluid) {
      margin: 0 2em !important;
    }
  }
`

S.Header = styled(Container)`
  /* pad between title/content and items */
  padding-bottom: 2.75em !important;
`

S.Title = styled(Header).attrs({ forwardedAs: "h2" })`
  /*   font-size: 3em; */

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
      margin-left: 10px;
      margin-right: 10px;

      &:last-of-type {
        margin-right: 20px;
      }
      &:first-of-type {
        margin-left: 20px;
      }
    `};

  @media ${media.laptop} {
    box-shadow: none;
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
      <Container>
        <S.ItemGroup relaxed divided>
          {React.Children.map(children, (blurb) =>
            withNewProps(blurb, {
              color: color || undefined,
              vertical: vertical || undefined,
            })
          )}
        </S.ItemGroup>
      </Container>
    ) : (
      <Container
        fluid={!!fullWidth}
        textAlign={centered ? "center" : undefined}
      >
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
      </Container>
    )}
  </S.Blurbs>
)

Blurbs.Item = Blurb
