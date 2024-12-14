import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { ESLint, type Linter } from 'eslint';

export const config: Linter.Config = {
  plugins: {
    '@typescript-eslint': typescriptEslint as unknown as ESLint.Plugin,
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: 'module',
  },

  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'] },

    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.cjs', '.ts', '.d.ts', '.json'] },
    },

    'import/extensions': [
      '.js',
      '.mjs',
      '.cjs',
      '.jsx',
      '.ts',
      '.d.ts',
      '.tsx',
    ],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },

  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],

    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
};

export default [config];
