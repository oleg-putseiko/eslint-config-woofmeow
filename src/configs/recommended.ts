import eslintJs from '@eslint/js';
import { type Linter } from 'eslint';
import unicornPlugin from 'eslint-plugin-unicorn';

const configs: Linter.Config[] = [
  /* --- Global Ignores --- */
  {
    ignores: [
      // Dependencies
      '**/node_modules',
      '**/.pnp',
      '**/.pnp.*',
      '**/.yarn',
      '**/yarn.lock',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/bun.lockb',

      // Debug
      '**/*.log',
      '**/*.log.*',

      // Testing
      '**/coverage',

      // Artifacts
      '**/build',
      '**/dist',
      '**/.cache',
      '**/.turbo',
      '**/.vercel',
      '**/.next',
      '**/out',
      '**/*.tsbuildinfo',
      '**/*.min.js',

      // Linting
      '**/.husky',
      '**/.eslintignore',
      '**/.prettierignore',

      // Misc
      '**/.DS_Store',
      '**/*.pem',

      // Environment
      '**/.env',
      '**/.env.*',

      // Code editors
      '**/.vscode',
      '**/.idea',
      '**/*.suo',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
    ],
  },

  /* --- Internal --- */
  eslintJs.configs.recommended,
  {
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
      'no-restricted-exports': ['error', { restrictDefaultExports: { direct: true, named: true } }],
      'no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'one-var': ['warn', 'never'],
      'prefer-exponentiation-operator': 'warn',
      'prefer-template': 'warn',
      'require-unicode-regexp': 'warn',
    },
  },

  /* --- Unicorn --- */
  unicornPlugin.configs.unopinionated,
  {
    plugins: { unicorn: unicornPlugin },
    rules: {
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-node-protocol': 'warn',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-optional-catch-binding': 'warn',
      'unicorn/prefer-modern-dom-apis': 'warn',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-date-now': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-fallback-in-spread': 'warn',
      'unicorn/explicit-length-check': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-instanceof-array': 'warn',
      'unicorn/throw-new-error': 'warn',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-thenable': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-useless-switch-case': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-classlist-toggle': 'off',
    },
  },
];

export default configs;
