module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: 3,
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
    ['@quickbaseoss/babel-plugin-styled-components-css-namespace', { cssNamespace: '&&&&&&' }],
    [
      'styled-components', {
        pure: true,
        fileName: false,
        displayName: false
      }
    ],
    [
      '@babel/plugin-transform-runtime', {
        corejs: 3,
        useESModules: true
      }
    ],
    [
      '@babel/plugin-transform-template-literals', {
        loose: true
      }
    ],
    '@babel/plugin-proposal-optional-chaining'
  ]
}
