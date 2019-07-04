module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:promise/recommended',
    'airbnb',
    'standard'
  ],
  plugins: [
    'jsdoc',
    'json',
    'optimize-regex',
    'markdown',
    'react-hooks'
  ],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    fetch: true
  },
  settings: {
    jsdoc: {
      ignorePrivate: true,
      exemptEmptyFunctions: true,
      forceRequireReturn: true,
      preferredTypes: {
        "*": false,
        ".<>": true,
        "<>": true,
        "[]": true
      }
    }
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-raw-text': 'off',
    'react/prop-types': [
      'warn',
      {
        skipUndeclared: true
      }
    ],
    'react/require-default-props': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.js',
          '.jsx'
        ]
      }
    ],
    'indent': ['error', 'tab'],
    'no-tabs': 'off',
    'react/jsx-indent': [
      'error',
      'tab',
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    'react/jsx-indent-props': [
      'error',
      'tab'
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'optimize-regex/optimize-regex': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'no-param-reassign': 'warn',
    'promise/catch-or-return': 'warn',
    'promise/always-return': 'warn',
    'import/prefer-default-export': 'off',
    'import/namespace': 'warn',
    'sort-imports': [
      'warn',
      {
        ignoreDeclarationSort: true
      }
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    // https://www.npmjs.com/package/eslint-plugin-jsdoc#eslint-plugin-jsdoc-settings-allow-private-to-disable-rules-for-that-comment-block
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/match-description': 'warn',
    'jsdoc/newline-after-description': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-jsdoc': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/valid-types': 'warn',
  },
  overrides: [{
    files: ['**/*.md'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-filename-extension': 'off',
      semi: 'off',
      'no-unused-expressions': 'off'
    }
  }]
}