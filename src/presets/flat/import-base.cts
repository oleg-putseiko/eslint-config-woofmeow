import { type Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

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

export = [config] satisfies Linter.Config[];
