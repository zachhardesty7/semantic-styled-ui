module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        loose: true,
        // useBuiltIns: 'usage', // TODO: currently breaks things in Gatsby projects
        shippedProposals: true,
        modules: false,
        corejs: { version: 3, proposals: true },
      },
    ],
    [
      '@babel/preset-react', {
        useBuiltIns: true,
        pragma: 'React.createElement',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [
      '@babel/plugin-transform-runtime', {
        corejs: { version: 3, proposals: true },
        useESModules: true,
      },
    ],
    ['@quickbaseoss/babel-plugin-styled-components-css-namespace', { cssNamespace: '&&&&&&' }],
    [
      'styled-components', {
        pure: true,
        fileName: false,
        displayName: false,
      },
    ],
    [
      '@babel/plugin-transform-template-literals', {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
  ],
}
