const baseConfigs = ['./import-base.js', './react.js', './typescript.js'].map(
  require.resolve,
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next', 'next/core-web-vitals', ...baseConfigs],
  rules: {
    // Overridden by `unused-imports/no-unused-vars`
    'no-unused-vars': 'off',

    // Overridden by `unused-imports/no-unused-vars`
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: [
        'src/pages/**/*{.js,.jsx,.ts,.tsx}',
        'pages/**/*{.js,.jsx,.ts,.tsx}',
        'src/app/layout{.js,.jsx,.ts,.tsx}',
        'app/layout{.js,.jsx,.ts,.tsx}',
        'app/**/page{.js,.jsx,.ts,.tsx}',
      ],
      rules: {
        'no-restricted-exports': [
          'error',
          {
            restrictDefaultExports: {
              direct: false,
              named: true,
            },
          },
        ],
      },
    },
  ],
};
