module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:promise/recommended',
    'airbnb',
    'standard'
  ],
  plugins: [
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
    'react/jsx-indent': [
      'warn',
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/namespace': 'error',
    'sort-imports': [
      'warn',
      {
        ignoreDeclarationSort: true
      }
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ]
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
