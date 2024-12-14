import { type Linter } from 'eslint';
import tseslint from 'typescript-eslint';

export const config: Linter.Config = {
  settings: {
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

export default tseslint.config(
  { files: ['**/*{ts,tsx}', '**/*[cm]ts'] },
  {
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 5,
      sourceType: 'module',
    },
  },
  config,
);
