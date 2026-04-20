import { type Linter } from 'eslint';
import relativeImportPlugin from 'eslint-plugin-no-relative-import-paths';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const configs: Linter.Config[] = [
  {
    plugins: {
      'no-relative-import-paths': relativeImportPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'error',

      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: false, rootDir: 'src', prefix: '@' },
      ],
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
];

export default configs;
