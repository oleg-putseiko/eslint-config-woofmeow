import { type Linter } from 'eslint';
import importFsdPlugin from 'eslint-plugin-import-fsd';

import baseImportConfig from './base.js';

const LAYER_GROUPS: string[][] = [
  ['app', 'apps', 'core', 'init'],
  ['process', 'processes', 'flow', 'flows', 'workflow', 'workflows'],
  ['page', 'pages', 'screen', 'screens', 'view', 'views', 'layout', 'layouts'],
  ['widget', 'widgets'],
  ['feature', 'features', 'component', 'components', 'container', 'containers'],
  ['entity', 'entities', 'model', 'models'],
  ['shared', 'common', 'lib', 'libs'],
];

const IMPORT_GROUPS: string[][] = [
  ['^node:'],
  ['^@?\\w', '^\\u0000'],
  ['^next', '^react', '^\\w'],
  ...LAYER_GROUPS.map((group) => [`^(src/|@/|@)?(${group.join('|')})`]),
  ['^@/'],
  ['^~'],
  ['^.+\\.s?css$', '^.+\\.(?!types).*\\.types$'],
  ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
  ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
  ['^'],
];

const configs: Linter.Config[] = [
  ...baseImportConfig,
  importFsdPlugin.configs.recommended,
  {
    settings: {
      rootDir: './src',
      aliases: { '@/*': './src/*' },
    },
    rules: {
      'simple-import-sort/imports': ['warn', { groups: IMPORT_GROUPS }],
    },
  },
];

export default configs;
