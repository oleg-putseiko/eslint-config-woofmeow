import { FlatCompat } from '@eslint/eslintrc';
import { Linter } from 'eslint';
import globals from 'globals';
import reactConfig from './react.js';
import { deduplicateConfigPlugins } from '../../utils/plugins.js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

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

export default deduplicateConfigPlugins([
  ...compat.config({ extends: ['next/core-web-vitals'] }),
  ...reactConfig,
  config,
]);
