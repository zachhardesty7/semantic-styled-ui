module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: '> 0.25%, not dead',
        // REVIEW: prevent rollup this undef error?
        // targets: {
        //   esmodules: true,
        // },
        loose: true,
        bugfixes: true,
        // don't polyfill while commented out
        // useBuiltIns: 'usage', // TODO: currently breaks things in Gatsby projects,
        // https://babeljs.io/docs/en/babel-preset-env#forcealltransforms
        shippedProposals: true, // https://babeljs.io/docs/en/babel-preset-env#shippedproposals
      },
    ],
    // '@babel/preset-typescript',
    [
      '@babel/preset-react', {
        // https://babeljs.io/docs/en/babel-preset-react/#react-automatic-runtime
        // runtime: 'automatic',
        useBuiltIns: true,
        development: process.env.ENV_MODE === 'local',
      },
    ],
  ],
  plugins: [
    // process.env.ENV_MODE === 'local' && [
    //   'babel-plugin-typescript-to-proptypes', { comments: true, typeCheck: true },
    // ],
    [
      '@quickbaseoss/babel-plugin-styled-components-css-namespace', {
        cssNamespace: '&&&&&&',
      },
    ],
    // [
    //   'styled-components', {
    //     // pure: true,
    //     // fileName: false,
    //     // displayName: false,
    //     pure: false,
    //     fileName: true,
    //     displayName: true,
    //   },
    // ],
  ],
}
