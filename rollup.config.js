import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const config = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  external: ['styled-components', 'react', 'react-dom'],
  plugins: [babel({ babelHelpers: 'bundled' }), resolve({ extensions: ['.js', '.jsx'] }), commonjs()],
}

export default config
