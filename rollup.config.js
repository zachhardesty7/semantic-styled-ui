import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import copy from "rollup-plugin-copy"
import replace from "@rollup/plugin-replace"

// rollup plugins
// https://github.com/ritz078/rollup-plugin-filesize
// https://www.npmjs.com/package/rollup-plugin-sizes
// https://github.com/rollup/plugins/tree/master/packages/alias#readme
// https://github.com/rollup/plugins/tree/master/packages/strip

// public docs
// https://www.npmjs.com/package/rollup-plugin-serve
// https://www.npmjs.com/package/rollup-plugin-livereload

// https://webpack.js.org/configuration/resolve/
// https://github.com/rollup/plugins/tree/master/packages/alias

// https://github.com/rollup/rollup/issues/1089#issuecomment-402109607
import path from "path"

import propTypesFromTS from "./rollup-plugin"

import pkg from "./package.json"

const onwarn = (warning, rollupWarn) => {
  const ignoredWarnings = [
    {
      ignoredCode: "CIRCULAR_DEPENDENCY",
      ignoredPath: "node_modules/semantic-ui-react/dist/",
    },
  ]

  // only show warning when code and path don't match
  // anything in above list of ignored warnings
  if (
    !ignoredWarnings.some(
      ({ ignoredCode, ignoredPath }) =>
        warning.code === ignoredCode &&
        (!ignoredPath || warning.importer.includes(path.normalize(ignoredPath)))
    )
  ) {
    rollupWarn(warning)
  }
}

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react/jsx-dev-runtime": "jsxDevRuntime",
  "styled-components": "styled",
}

const config = async (args) => ({
  input: "src/index.js",
  output: args.configDev
    ? {
        // preserveModules: true, // REVIEW: cons: slow slow, pros: processing
        // dir: "dist",
        // name: "SSUI",
        exports: "named",
        file: pkg.module,
        format: "esm",
        globals,
      }
    : [
        {
          file: pkg.unpkg,
          format: "umd",
          name: "SSUI",
          globals,
          plugins: [(await import("rollup-plugin-terser")).terser()],
        },
        {
          exports: "named",
          file: pkg.main,
          format: "cjs",
        },
        {
          exports: "named",
          file: pkg.module,
          format: "esm",
        },
      ],
  external: ["styled-components", "react", "react-dom"],
  plugins: [
    // FIXME: don't think these are properly generated currently
    args.configPropTypes && propTypesFromTS(),
    replace({
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    }),
    args.configAnalyze &&
      (await import("rollup-plugin-size-snapshot")).sizeSnapshot(),
    copy({
      copyOnce: true,
      flatten: false,
      targets: [
        { src: "src/**/*.d.ts", dest: "dist" },
        { src: "src/**/*.stories.jsx", dest: "dist" },
      ],
    }),
    // https://www.npmjs.com/package/rollup-plugin-sourcemaps
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    resolve({ extensions: [".js", ".jsx"] }),
    commonjs(),
    args.configAnalyze &&
      (await import("rollup-plugin-visualizer")).visualizer({
        open: true,
        template: "sunburst",
        gzipSize: true,
      }),
  ],
  onwarn,
})

export default config
