import globals from 'globals';
import { ConfigCompat } from '../../utils/config-compat';
import { type Linter } from 'eslint';

const compat = new ConfigCompat({ fileUrl: import.meta.url });

export const configsToExtend: string[] = [
  'next',
  'next/core-web-vitals',
  './react.ts',
];

export const config: Linter.Config = {
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

export default [...compat.extends(...configsToExtend), config];
