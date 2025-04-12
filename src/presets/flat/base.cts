import { type Linter } from 'eslint';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

const config: Linter.Config[] = compat.compatible({
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
});

export = [
  ...compat.toFlat('prettier', 'eslint:recommended'),
  ...config,
] satisfies Linter.Config[];
