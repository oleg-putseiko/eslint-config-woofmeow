import eslint from '@eslint/js';
import { type Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier/flat';

const config: Linter.Config = {
  rules: {
    'array-callback-return': ['error', { checkForEach: true }],
    eqeqeq: 'error',
    'max-classes-per-file': ['error', { ignoreExpressions: true }],
    'no-console': 'warn',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-floating-decimal': 'warn',
    'no-nested-ternary': 'warn',
    'no-restricted-exports': [
      'error',
      { restrictDefaultExports: { direct: true, named: true } },
    ],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'one-var': ['warn', 'never'],
    'prefer-exponentiation-operator': 'warn',
    'prefer-template': 'warn',
    'require-unicode-regexp': 'warn',
  },
};

export default [
  eslint.configs.recommended,
  prettierConfig,
  config,
] satisfies Linter.Config[];
