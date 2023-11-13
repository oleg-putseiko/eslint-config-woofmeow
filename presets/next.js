const baseConfigs = ['./react.js'].map(require.resolve);

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next', 'next/core-web-vitals', ...baseConfigs],
  overrides: [
    {
      files: [
        // Pages Router
        'src/pages/**/*{.js,.jsx,.ts,.tsx}',
        'pages/**/*{.js,.jsx,.ts,.tsx}',
        // App Router
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
