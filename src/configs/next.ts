import { Linter } from 'eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import reactConfig from './react.js';

const configs: Linter.Config[] = [
  ...nextVitals,
  ...nextTs,
  ...reactConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
].map<Linter.Config>((config) => {
  const formattedConfig = {
    ...config,
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  };

  if (formattedConfig.plugins?.['@typescript-eslint']) {
    formattedConfig.plugins['@typescript-eslint'] = tseslint.plugin;
  }

  return formattedConfig;
});

export default configs;
