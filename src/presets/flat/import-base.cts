import { type Linter } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import baseConfig from './base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

const config: Linter.Config[] = compat.compatible({
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
  },
  rules: {
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'warn',
  },
});

export = [...baseConfig, ...config] satisfies Linter.Config[];
