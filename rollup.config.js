import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

// https://github.com/rollup/rollup/issues/1089#issuecomment-402109607
import path from 'path'

const onwarn = (warning, rollupWarn) => {
  const ignoredWarnings = [
    {
      ignoredCode: 'CIRCULAR_DEPENDENCY',
      ignoredPath: 'node_modules/semantic-ui-react/dist/',
    },
    {
      ignoredCode: 'THIS_IS_UNDEFINED',
    },
  ]

  // only show warning when code and path don't match
  // anything in above list of ignored warnings
  if (!ignoredWarnings.some(({ ignoredCode, ignoredPath }) => (
    warning.code === ignoredCode &&
    (!ignoredPath || warning.importer.includes(path.normalize(ignoredPath)))))
  ) {
    rollupWarn(warning)
  }
}

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-dev-runtime': 'jsxDevRuntime',
  'styled-components': 'styled',
}

const prodBundles = [
  {
    file: 'dist/bundle.umd.js',
    format: 'umd',
    name: 'SSUI',
    globals,
  },
  {
    file: 'dist/bundle.min.umd.js',
    format: 'umd',
    name: 'SSUI',
    globals,
    plugins: [terser()],
  },
  {
    // dir: 'dist',
    file: 'dist/bundle.cjs.js',
    format: 'cjs',
  },
  {
    // dir: 'dist',
    file: 'dist/bundle.min.cjs.js',
    format: 'cjs',
    plugins: [terser()],
  },
  {
    // dir: 'dist',
    file: 'dist/bundle.esm.js',
    format: 'esm',
  },
  {
    // dir: 'dist',
    file: 'dist/bundle.min.esm.js',
    format: 'esm',
    plugins: [terser()],
  },
]

const config = {
  input: 'src/index.js',
  // preserveModules: true, // REVIEW: cons: slow slow, pros: ??
  output: process.env.ENV_MODE === 'prod' ? prodBundles : {
    file: 'dist/bundle.umd.js',
    format: 'umd',
    name: 'SSUI',
    globals,
  },
  external: ['styled-components', 'react', 'react-dom'],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs(),
  ],
  onwarn,
}

export default config
