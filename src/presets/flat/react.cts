import { type Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import baseConfig from './base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

const config: Linter.Config[] = compat.compatible({
  plugins: { react: reactPlugin },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      React: true,
      JSX: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    'react/boolean-prop-naming': [
      'warn',
      {
        rule: '^(is|are|has|can|should)[A-Z]([A-Za-z0-9]?)+',
        message:
          "Use one of the 'is', 'are', 'has', 'can' or 'should' prefixes",
      },
    ],
    'react/button-has-type': 'error',
    'react/display-name': 'off',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/hook-use-state': ['warn', { allowDestructuredState: true }],
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': 'warn',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-pascal-case': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-multi-comp': 'warn',
    'react/no-namespace': 'warn',
    'react/no-object-type-as-default-prop': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'error',
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    'react/void-dom-elements-no-children': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
});

export = [
  reactHooksPlugin.configs['recommended-latest'],
  // NOTE: Since version 7.35.0 the React plugin object contains a cyclic structure
  ...compat.toFlat('plugin:react/recommended', 'plugin:react/jsx-runtime'),
  ...baseConfig,
  ...config,
] satisfies Linter.Config[];
