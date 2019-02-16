let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful') // eslint-disable-line global-require
} catch (_) { console.info('using env vars') }

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
}

// process.env.GATSBY_CONTENTFUL_OFFLINE = true

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/`)
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-133288229-1',
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    // 'gatsby-plugin-webpack-bundle-analyzer',
    // TODO: investigate and fix styling issues
    // likely hydration related: https://reactjs.org/docs/react-dom.html#hydrate
    // optionally try babel-plugin-styled-components
    // 'gatsby-plugin-offline',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/favicon.png',

        // WebApp Manifest Configuration
        appName: 'Gulf Corp', // Inferred with your package.json
        appDescription: 'Real Estate Development & Construction',
        developerName: 'Zach Hardesty',
        developerURL: 'https://zachhardesty.com',
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          windows: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        pure: true
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    }
  ]
}
