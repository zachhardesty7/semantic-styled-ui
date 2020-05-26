module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        loose: true,
        // useBuiltIns: 'usage', // TODO: currently breaks things in Gatsby projects
        shippedProposals: true,
        modules: false,
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
