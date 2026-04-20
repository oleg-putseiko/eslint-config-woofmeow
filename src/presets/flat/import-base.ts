import { type Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import baseConfig from './base.js';

const config: Linter.Config = {
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
  },
  rules: {
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'warn',
  },
};

export default [...baseConfig, config] satisfies Linter.Config[] as Linter.Config[];
