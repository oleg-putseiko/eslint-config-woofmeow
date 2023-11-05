module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'simple-import-sort/exports': 'warn',

    'unused-imports/no-unused-imports': 'warn',
    // Overrides `no-unused-vars` and `@typescript-eslint/no-unused-vars` rules
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
