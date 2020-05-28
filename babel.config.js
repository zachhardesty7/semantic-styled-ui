module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: '> 0.25%, not dead',
        loose: true,
        // useBuiltIns: 'usage', // TODO: currently breaks things in Gatsby projects
        shippedProposals: true,
        modules: false,
      },
    ],
    [
      '@babel/preset-react', {
        pragma: 'React.createElement',
      },
    ],
  ],
  plugins: [
    [
      '@quickbaseoss/babel-plugin-styled-components-css-namespace', {
        cssNamespace: '&&&&&&',
      },
    ],
    [
      'styled-components', {
        pure: true,
        fileName: false,
        displayName: false,
      },
    ],
  ],
}
