import { Linter } from 'eslint';
import flatConfig from '../flat/typescript.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const eslintrcConfig = compat.toEslintrc(flatConfig[0], {
  extends: ['./base.cjs'],
});

export = {
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
      '@typescript-eslint/parser': [
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
      ],
    },
  },
} satisfies Linter.LegacyConfig;
