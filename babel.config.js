module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        loose: true,
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: { version: 3, proposals: true },
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
    // [
    //   'emotion',
    //   {
    //     // sourceMap is on by default but source maps are dead code eliminated in production
    //     sourceMap: process.env.NODE_ENV !== 'production',
    //     autoLabel: process.env.NODE_ENV !== 'production',
    //     labelFormat: '[local]',
    //     cssPropOptimization: true
    //   }
    // ],
    [
      '@babel/plugin-transform-runtime', {
        corejs: 3,
        proposals: true,
        useESModules: true
      }
    ],
    ['@quickbaseoss/babel-plugin-styled-components-css-namespace', { cssNamespace: '&&&&&&' }],
    [
      'styled-components', {
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
    '@babel/plugin-proposal-optional-chaining'
  ]
}
