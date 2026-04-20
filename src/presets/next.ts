import { Linter } from 'eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';

import reactConfig from './react.js';

const configs: Linter.Config[] = [
  ...reactConfig,
  ...nextVitals,
  ...nextTs,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

export default configs;
