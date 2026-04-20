import { type Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

const configs: Linter.Config[] = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: 'readonly',
        JSX: 'readonly',
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
          rule: '^(are|can|did|does|has|is|must|should|was|were|will)[A-Z]([A-Za-z0-9]?)+',
          message:
            'Boolean props must start with a semantic prefix (e.g. is, has, should, can, did, etc.)',
        },
      ],
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'react/hook-use-state': ['warn', { allowDestructuredState: true }],
      'react/iframe-missing-sandbox': 'error',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-fragments': 'error',
      'react/jsx-handler-names': 'warn',
      'react/jsx-key': [
        'error',
        { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
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
  },
];

export default configs;
