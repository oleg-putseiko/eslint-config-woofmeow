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

  {
    files: [
      '**/app/**/{page,layout,loading,error,not-found,global-error,template}.{ts,tsx}',
      '**/app/**/route.{ts,tsx}',
      '**/pages/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-exports': 'off',
    },
  },
].map<Linter.Config>((config) => {
  const formattedConfig = {
    ...config,
    files: config.files ?? ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  };

  if ('plugins' in formattedConfig && formattedConfig.plugins?.['@typescript-eslint']) {
    formattedConfig.plugins['@typescript-eslint'] = tseslint.plugin;
  }

  return formattedConfig as Linter.Config;
});

export default configs;
