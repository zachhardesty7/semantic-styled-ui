import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'

import { Navigation, Footer } from '../components'
import { colors, media } from '../utils'

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    font-size: 1em;
    line-height: 1.65;
    color: ${({ theme }) => theme?.dark || colors.dark};
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme?.secondary || colors.secondary};
    &:hover {
      color: ${({ theme }) => theme?.white || colors.white};
    }
  }

  ${media.desktop`
    .ui.four.doubling.cards>.card {
      width: calc(30% - 1.5em) !important;
    }
  `}

  ${media.laptop`
    .ui.four.doubling.cards>.card {
      width: calc(40% - 1.5em) !important;
    }
  `}

  ${media.mobile`
    /* REVIEW: */
    .ui.container {
      font-size: 1.1rem !important;
      padding-left: 1.5em !important;
      padding-right: 1.5em !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .ui.four.doubling.cards {
      padding-top: 0.75em !important;

      & > .card {
        max-width: 20em;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    }

    .ui.stackable.grid>.column, .ui.container>.ui.stackable.grid>.row>.column {
      max-width: 375px;
    }
  `}

  ${media.phone`
    .ui.container.text.justified{
      text-align: left !important;
    }
  `}
`

const Template = ({ result, children }) => {
  const nav = result.allContentfulNavigation.edges[0].node
  const footer = result.allContentfulFooter.edges[0].node

  const gulfColors = {
    blue: '#172749',
    red: '#fe0000',
    grey: '#5b5b5b'
  }

  return (
    <ThemeProvider theme={{
      ...gulfColors,
      primary: gulfColors.blue,
      secondary: colors.white,
      accent: gulfColors.red
    }}
    >
      <div className='root'>
        <Helmet
          defaultTitle='Gulf Corp'
          titleTemplate='Gulf Corp – %s'
        >
          <meta charSet='utf-8' />
          <meta name='description' content='Real Estate Development & Construction' />
          <meta name='keywords' content='Real Estate, Development, Construction, Property' />
          <meta name='author' content='Austin Ames' />
        </Helmet>
        <GlobalStyle />
        <Navigation
          logo={nav.image.fixed}
          stacked
          largeLogo
          logoAlt='logo'
          anchor={false}
          centered
          pages={['About', 'Portfolio', 'Contact']}
        />
        {children}
        <Footer
          // force-update on page change to enforce stickiness
          key={`${children.key}footer`}
          inverted
          copyright={footer.company}
          separated
          developerName='Zach Hardesty'
          developerLink='https://zachhardesty.com'
        />
      </div>
    </ThemeProvider>
  )
}

Template.propTypes = {
  result: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

Template.defaultProps = {
  result: {},
  children: null
}

export default React.memo(props => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulNavigation(sort: {fields: [contentful_id]}) {
          edges {
            node {
              image {
                title
                fixed(width: 215) {
                  ...GatsbyContentfulFixed_withWebp
                }
              }
              pages
            }
          }
        }

        allContentfulFooter(sort: {fields: [contentful_id]}) {
          edges {
            node {
              company
            }
          }
        }
      }
    `}
    // IMPORTANT: queried data cannot be passed through the "data" prop
    // as it will be overrode by the wrapped page's query data
    render={data => <Template result={data} {...props} />}
  />
))
