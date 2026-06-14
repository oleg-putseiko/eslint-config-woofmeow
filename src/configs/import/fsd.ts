import { type Linter } from 'eslint';
import { createRequire } from 'node:module';
import baseImportConfigFactory from './base.js';
import { type LazyFactory } from '../../utils/lazy.js';

const require = createRequire(import.meta.url);

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

const configsFactory: LazyFactory<Linter.Config[]> = () => {
  const importFsdPlugin = require('eslint-plugin-import-fsd');

  return [
    ...baseImportConfigFactory(),
    importFsdPlugin.configs.recommended,
    {
      settings: {
        fsd: {
          rootDir: './src',
          aliases: { '@/*': './src/*' },
        },
      },
      rules: {
        'simple-import-sort/imports': ['warn', { groups: IMPORT_GROUPS }],
      },
    },
  ];
};

export default configsFactory;
