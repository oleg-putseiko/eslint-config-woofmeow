import { config as flatConfig } from '../flat/typescript';
import { ConfigCompat } from '../../utils/config-compat';
import { Linter } from 'eslint';

const compat = new ConfigCompat();

const eslintrcConfig = compat.eslintrc(flatConfig);

export default {
  ...eslintrcConfig,
  plugins: [...(eslintrcConfig.plugins ?? []), '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'module',
  },
  settings: {
    ...eslintrcConfig.settings,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.cts', '.mts', '.tsx', '.d.ts'],
    },
  },
} satisfies Linter.LegacyConfig;
