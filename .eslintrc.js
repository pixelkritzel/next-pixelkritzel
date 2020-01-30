module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/prop-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  },

  overrides: [
    {
      files: ['next.config.js'],
      parserOptions: {
        // Only ESLint 6.2.0 and later support ES2020.
        ecmaVersion: 2020
      },
      extends: ['eslint:recommended', 'plugin:node/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'node/no-unsupported-features/es-syntax': 0
      }
    }
  ]
};
