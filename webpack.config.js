const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'semantic-styled-ui.min.js'
  },
  resolve: {
    alias: {
      react: path.resolve(path.join(__dirname, './node_modules/react')),
      'react-dom': path.resolve(path.join(__dirname, './node_modules/react-dom'))
    }
  },
  plugins: [
    new CleanWebpackPlugin('./dist')
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: [
          [
            '@babel/preset-env', {
              loose: true,
              modules: false,
              useBuiltIns: 'usage',
              shippedProposals: true,
              targets: {
                browsers: [
                  '>0.25%',
                  'not dead'
                ]
              }
            }
          ],
          [
            '@babel/preset-react', {
              useBuiltIns: true,
              pragma: 'React.createElement'
            }
          ]
        ],
        plugins: [
          [
            '@quickbaseoss/babel-plugin-styled-components-css-namespace', {
              cssNamespace: 'root.root.root'
              // broken in current version lol
              // "rawCssNamespace": "#___gatsby"
            }
          ],
          [
            'babel-plugin-styled-components', {
              pure: true
            }
          ],
          '@babel/plugin-proposal-optional-chaining',
          [
            '@babel/plugin-proposal-class-properties', {
              loose: true
            }
          ],
          '@babel/plugin-syntax-dynamic-import'
        ]
      }
    }]
  }
}
