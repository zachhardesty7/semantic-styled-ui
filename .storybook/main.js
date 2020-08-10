module.exports = {
  stories: ["../src/**/*.stories.(js|jsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        // babelOptions: {},
        // sourceLoaderOptions: null,
      },
    },
  ],
}
