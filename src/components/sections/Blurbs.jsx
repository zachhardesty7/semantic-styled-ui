import React from 'react'
import styled, { css } from 'styled-components'

import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'
import { Blurb } from '../Blurb'

import {
  media,
  paddingMap,
  withNewProps,
} from '../../utils'

const S = {} // styled-components namespace

/* fix absurdly wide blurb segments on tablet size */
/* use "!important" to override .ui.text.container */
S.Blurbs = styled(Segment)`
  ${({ $padded, padding }) => (
    ($padded === 'top' && `padding-top: ${paddingMap[padding]}`) ||
    ($padded === 'bottom' && `padding-bottom: ${paddingMap[padding]}`) ||
    ($padded && `padding: ${paddingMap[padding]} 0`)
  )};

  @media ${media.tablet} {
    .container:not(.fluid) {
      max-width: 397px !important;
      padding: 0 1.5em;
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
  padding-bottom: 2.75em;
`

S.Title = styled(Header).attrs({ forwardedAs: 'h3' })`
  font-size: 3em;
`

S.Content = styled(Header.Content)`
  text-align: ${({ $textAlign }) => $textAlign};
`

S.Grid = styled(Grid)`
  ${({ $fullWidth }) => $fullWidth === 'gutter' && css`
    @media ${media.laptop} {
      flex-wrap: nowrap
    }
    @media ${media.desktop} {
      flex-wrap: nowrap
    }
    @media ${media.widescreen} {
      flex-wrap: nowrap
    }
  `};
`

S.GridCol = styled(Grid.Column)`
  ${({ $fullWidth }) => $fullWidth === 'gutter' && css`
    margin-left: 10px;
    margin-right: 10px;

    &:last-of-type {
      margin-right: 20px;
    }
    &:first-of-type {
      margin-left: 20px;
    }
  `};
`

export const Blurbs = ({
  title,
  content,
  fullWidth = false,
  textAlign = 'left',
  color = '',
  secondary = false,
  padded = 'both',
  padding = 'relaxed',
  children,
  ...rest
}) => (
  <S.Blurbs
    $padded={padded}
    padding={padding}
    forwardedAs='section'
    vertical
    basic
    secondary={secondary}
    {...rest}
  >
    {(title || content) && (
      <S.Header text>
        {title && (
          <S.Title textAlign='center'>{title}</S.Title>
        )}
        {content && (
          <S.Content $textAlign={textAlign}>{content}</S.Content>
        )}
      </S.Header>
    )}
    <Container fluid={!!fullWidth} textAlign='center'>
      <S.Grid
        columns={Math.min(React.Children.count(children), 8)}
        relaxed
        stackable
        divided
        padded
        $fullWidth={fullWidth}
      >
        {React.Children.map(children, (blurb) => (
          <S.GridCol $fullWidth={fullWidth}>
            {withNewProps(blurb, { color: color || undefined })}
          </S.GridCol>
        ))}
      </S.Grid>
    </Container>
  </S.Blurbs>
)

Blurbs.Item = Blurb
