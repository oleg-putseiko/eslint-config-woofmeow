import globals from 'globals';
import { ConfigCompat } from '../../utils/config-compat.cjs';
import { type Linter } from 'eslint';
import reactFlatConfig from './react.cjs';

const compat = new ConfigCompat();

const mergeableReactConfig: Linter.Config[] = reactFlatConfig.map((config) =>
  compat.excludePlugins(config, ['react']),
);

const config: Linter.Config = {
  files: [
    'src/pages/**/*{.js,.jsx,.ts,.tsx}',
    'pages/**/*{.js,.jsx,.ts,.tsx}',
    'src/app/layout{.js,.jsx,.ts,.tsx}',
    'src/app/**/page{.js,.jsx,.ts,.tsx}',
    'app/layout{.js,.jsx,.ts,.tsx}',
    'app/**/page{.js,.jsx,.ts,.tsx}',
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
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
};

export = [
  config,
  ...mergeableReactConfig,
  ...compat.toFlat('next', 'next/core-web-vitals'),
] satisfies Linter.Config[];
