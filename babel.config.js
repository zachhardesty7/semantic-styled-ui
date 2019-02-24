module.exports = {
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
        pure: true,
        fileName: false,
        displayName: false
      }
    ],
    [
      '@babel/plugin-transform-template-literals', {
        loose: true
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
