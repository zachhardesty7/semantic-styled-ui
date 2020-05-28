module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: '> 0.25%, not dead',
        loose: true,
        bugfixes: true,
        // don't polyfill while commented out
        // useBuiltIns: 'usage', // TODO: currently breaks things in Gatsby projects,
        // https://babeljs.io/docs/en/babel-preset-env#forcealltransforms
        shippedProposals: true, // https://babeljs.io/docs/en/babel-preset-env#shippedproposals

        // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto".
        // Enable transformation of ES6 module syntax to another module type.
        // Setting this to false will not transform modules.
        modules: false,
      },
    ],
    [
      '@babel/preset-react', {
        // https://babeljs.io/docs/en/babel-preset-react/#react-automatic-runtime
        runtime: 'automatic',
        // useBuiltIns: true,
        // useSpread: true,
        development: process.env.ENV_MODE === 'local',
      },
    ],
  ],
  plugins: [
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
