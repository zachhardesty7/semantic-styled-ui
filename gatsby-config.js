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

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-133288229-1',
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    // 'gatsby-plugin-webpack-bundle-analyzer',
    'gatsby-plugin-offline',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
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
