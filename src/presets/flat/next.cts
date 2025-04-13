import { Linter } from 'eslint';
import globals from 'globals';
import reactConfig from './react.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';
import { deduplicateConfigPlugins } from '../../utils/plugins.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const config: Linter.Config = {
  files: ['src/pages/**/*.{js,jsx,ts,tsx}', 'src/app/**/*.{js,jsx,ts,tsx}'],
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

export = deduplicateConfigPlugins([
  ...compat.toFlat('next', 'next/core-web-vitals'),
  ...reactConfig,
  config,
]);
