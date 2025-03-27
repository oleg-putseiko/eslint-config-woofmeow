import { type Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import baseConfig from './base.cjs';

const config: Linter.Config = {
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
  },
  rules: {
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'warn',

    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};

export = [config, ...baseConfig] satisfies Linter.Config[];
