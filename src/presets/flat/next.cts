import globals from 'globals';
import { ConfigCompat } from '../../utils/config-compat.cjs';
import { type Linter } from 'eslint';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = [
  'next',
  'next/core-web-vitals',
  './react.cjs',
];

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
  ...compat.extends(...configsToExtend),
] satisfies Linter.Config[];
