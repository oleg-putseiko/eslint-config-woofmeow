import { type Linter } from 'eslint';
import globals from 'globals';
import { createRequire } from 'node:module';

import reactConfigFactory from './react.js';
import { type LazyFactory } from '../utils/lazy.js';

const require = createRequire(import.meta.url);

const configsFactory: LazyFactory<Linter.Config[]> = () => {
  const nextVitals = require('eslint-config-next/core-web-vitals');
  const nextTs = require('eslint-config-next/typescript');
  const tseslint = require('typescript-eslint');

  return [
    ...nextVitals,
    ...nextTs,
    ...reactConfigFactory(),
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
};

export default configsFactory;
