import React from 'react'
import PropTypes from 'prop-types'
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
  withoutProps,
} from '../../utils'

const S = {} // styled-components namespace

/* fix absurdly wide blurb segments on tablet size */
/* use "!important" to override .ui.text.container */
const FSegment = withoutProps(Segment, ['padded'])
S.Blurbs = styled(FSegment)`
  ${({ padded, padding }) => (
    (padded === 'top' && `padding-top: ${paddingMap[padding]}`) ||
    (padded === 'bottom' && `padding-bottom: ${paddingMap[padding]}`) ||
    (padded && `padding: ${paddingMap[padding]} 0`)
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

S.Title = styled(Header)`
  font-size: 3em;
`

const HeaderContentFiltered = withoutProps(Header.Content, ['textAlign'])
S.Content = styled(HeaderContentFiltered)`
  text-align: ${({ textAlign }) => textAlign};
`

const GridFiltered = withoutProps(Grid, ['fullWidth'])
S.Grid = styled(GridFiltered)`
  ${({ fullWidth }) => fullWidth === 'gutter' && css`
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

const GridColFiltered = withoutProps(Grid.Column, ['fullWidth'])
S.GridCol = styled(GridColFiltered)`
  ${({ fullWidth }) => fullWidth === 'gutter' && css`
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
    padded={padded}
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
          <S.Title forwardedAs='h3' textAlign='center'>{title}</S.Title>
        )}
        {content && (
          <S.Content textAlign={textAlign}>{content}</S.Content>
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
        fullWidth={fullWidth}
      >
        {React.Children.map(children, (blurb) => (
          <S.GridCol fullWidth={fullWidth}>
            {withNewProps(blurb, { color })}
          </S.GridCol>
        ))}
      </S.Grid>
    </Container>
  </S.Blurbs>
)

Blurbs.propTypes = {
  /** header */
  title: PropTypes.node,

  /** body content proceeding blurbs */
  content: PropTypes.node,

  /** do not restrict width of blurbs container */
  fullWidth: PropTypes.oneOf([true, false, 'gutter']),

  /** format body content */
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

  /** apply css supported color string to all children, overrides theme / default */
  color: PropTypes.string,

  /** format to appear less prominent (grey background) */
  secondary: PropTypes.bool,

  /** if/where spacing around element exists */
  padded: PropTypes.oneOf([false, true, 'top', 'bottom', 'both']),

  /** control amount of spacing around element */
  padding: PropTypes.oneOf(['compact', 'tight', 'base', 'relaxed', 'loose']),

  /** primary content of Blurbs.Item */
  children: PropTypes.node,
}

Blurbs.Item = Blurb
