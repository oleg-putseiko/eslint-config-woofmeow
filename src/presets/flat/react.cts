import { type Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import baseConfig from './base.cjs';

const config: Linter.Config = {
  plugins: { react: reactPlugin, 'react-hooks': reactHooksPlugin },
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
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-pascal-case': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'warn',
    'react/no-namespace': 'warn',
    'react/no-object-type-as-default-prop': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'off',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    'react/void-dom-elements-no-children': 'error',

    /* JSX Runtime */
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    /* React Hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};

export = [config, ...baseConfig] satisfies Linter.Config[];
