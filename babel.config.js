module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
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
      "@babel/preset-react",
      {
        // https://babeljs.io/docs/en/babel-preset-react/#react-automatic-runtime
        // runtime: 'automatic',
        useBuiltIns: true,
        // cannot use `development` which adds `jsx source` and `jsx self` babel plugins
        // due to `undefined` this
        // https://github.com/rollup/rollup/pull/3645
      },
    ],
  ],
  plugins: [
    // add back missing source from `preset-react`
    process.env.ENV_MODE === "local"
      ? "@babel/plugin-transform-react-jsx-source"
      : {},
    [
      "@quickbaseoss/babel-plugin-styled-components-css-namespace",
      {
        cssNamespace: "&&&&&&",
      },
    ],
    [
      "styled-components",
      {
        pure: process.env.ENV_MODE !== "local",
        fileName: process.env.ENV_MODE === "local",
        displayName: process.env.ENV_MODE === "local",
      },
    ],
  ],
}
