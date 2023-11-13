/**
 * General preset
 *
 * @exports general
 *
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['prettier', 'eslint:recommended'],
  rules: {
    'array-callback-return': ['error', { checkForEach: true }],
    eqeqeq: 'error',
    'no-empty-function': 'error',
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          direct: true,
          named: true,
        },
      },
    ],
    'no-console': 'warn',
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'max-classes-per-file': ['error', { ignoreExpressions: true }],
    'no-floating-decimal': 'warn',
    'prefer-template': 'warn',
    'no-nested-ternary': 'warn',
    'no-else-return': 'error',
    'one-var': ['warn', 'never'],
    'prefer-exponentiation-operator': 'warn',
    'require-unicode-regexp': 'warn',
  },
};
