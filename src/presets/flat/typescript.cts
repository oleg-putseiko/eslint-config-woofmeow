import { ESLint, type Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import baseConfig from './base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const FILE_EXTENSIONS: string[] = [
  '.ts',
  '.cts',
  '.mts',
  '.d.ts',
  '.d.cts',
  '.d.mts',
  '.tsx',
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.json',
  '.node',
];

const compat = new ConfigCompat();

const config: Linter.Config[] = compat.compatible({
  settings: {
    'import/extensions': FILE_EXTENSIONS,
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': { '@typescript-eslint/parser': FILE_EXTENSIONS },
    'import/resolver': { node: { extensions: FILE_EXTENSIONS } },
  },
  plugins: { '@typescript-eslint': tseslint.plugin as ESLint.Plugin },
  languageOptions: {
    parser: tseslint.parser as Linter.Parser,
    parserOptions: {
      ecmaVersion: 5,
      sourceType: 'module',
      projectService: true,
    },
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
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
});

export = [
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...config,
] as Linter.Config[];
