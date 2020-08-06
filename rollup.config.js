import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"
// import alias from "@rollup/plugin-alias"

// https://www.npmjs.com/package/rollup-plugin-visualizer
// https://www.npmjs.com/package/rollup-plugin-sizes
// https://www.npmjs.com/package/rollup-plugin-progress

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

const prodBundles = [
  // {
  //   file: "dist/bundle.umd.js",
  //   format: "umd",
  //   name: "SSUI",
  //   globals,
  // },
  // {
  //   file: "dist/bundle.min.umd.js",
  //   format: "umd",
  //   name: "SSUI",
  //   globals,
  //   plugins: [terser()],
  // },
  {
    // preserveModules: true,
    // dir: "dist",
    // name: "SSUI",
    exports: "named",
    file: pkg.main,
    format: "cjs",
  },
  // {
  //   preserveModules: true,
  //   dir: "dist",
  //   name: "SSUI",
  //   // file: "dist/bundle.min.cjs.js",
  //   format: "cjs",
  //   plugins: [terser()],
  // },
  {
    // preserveModules: true,
    // dir: "dist",
    // name: "SSUI",
    exports: "named",
    file: pkg.module,
    format: "esm",
  },
  // {
  //   preserveModules: true,
  //   dir: "dist",
  //   name: "SSUI",
  //   // file: "dist/bundle.min.esm.js",
  //   format: "esm",
  //   plugins: [terser()],
  // },
]

const config = {
  input: "src/index.js",
  output:
    process.env.ENV_MODE === "prod"
      ? prodBundles
      : {
          // preserveModules: true, // REVIEW: cons: slow slow, pros: processing
          // dir: "dist",
          // name: "SSUI",
          exports: "named",
          file: pkg.module,
          format: "esm",
          globals,
        },
  external: ["styled-components", "react", "react-dom"],
  plugins: [
    // alias({
    //   entries: [
    //     { find: "utils", replacement: "../../utils" },
    //   ],
    // }),
    copy({
      copyOnce: true,
      flatten: false,
      targets: [{ src: "src/**/*.d.ts", dest: "dist" }],
    }),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    resolve({ extensions: [".js", ".jsx"] }),
    commonjs(),
    process.env.ENV_MODE === "local" && propTypesFromTS(),
  ],
  onwarn,
}

export default config
