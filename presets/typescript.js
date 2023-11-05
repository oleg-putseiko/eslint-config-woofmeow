module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.cjs', '.ts', '.d.ts', '.json'],
      },
    },
    'import/extensions': [
      '.js',
      '.mjs',
      '.cjs',
      '.jsx',
      '.ts',
      '.d.ts',
      '.tsx',
    ],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // Overridden by `@typescript-eslint/no-empty-function`
    'no-empty-function': 'off',
    // Overridden by `@typescript-eslint/no-unused-vars`
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
};
