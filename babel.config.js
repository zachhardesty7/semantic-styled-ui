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
    '@quickbaseoss/babel-plugin-styled-components-css-namespace',
    [
      'babel-plugin-styled-components', {
        pure: true,
        fileName: false,
        displayName: false
      }
    ],
    'transform-object-from-entries',
    [
      '@babel/plugin-transform-template-literals', {
        loose: true
      }
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
