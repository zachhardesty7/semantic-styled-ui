import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { createGlobalStyle } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'

import { Navigation, Footer } from './components'
import theme from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    font-size: 1em;
    line-height: 1.65;
    color: ${theme.dark};
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    font-size: 2em;
    font-weight: normal;
  }

  a {
    color: ${theme.secondary};
    &:hover {
      color: ${theme.white};
    }
  }
`

const Template = ({ data, children }) => {
  const nav = data.allContentfulNavigation.edges[0].node
  const footer = data.allContentfulFooter.edges[0].node

  return (
    <div className='root'>
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
        inverted
        copyright={footer.company}
        separated
        developerName='Zach Hardesty'
        developerLink='https://zachhardesty.com'
      />
    </div>
  )
}

Template.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

Template.defaultProps = {
  data: {},
  children: null
}

// export default Template

export default props => (
  <StaticQuery
    query={
      graphql`
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
`
    }
    render={data => <Template data={data} {...props} />}
  />
)
