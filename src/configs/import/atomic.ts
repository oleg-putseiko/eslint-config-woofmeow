import { type Linter } from 'eslint';
import baseImportConfigFactory from './base.js';
import { type LazyFactory } from '../../utils/lazy.js';

const LAYER_GROUPS: string[][] = [
  ['types?', 'declarations?', 'definitions?'],
  ['servers?'],
  ['services?', 'api', 'requests?', 'queries', 'query'],
  ['controllers?', 'stores?', 'states?'],
  ['libs?', 'hooks?', 'utils?', 'helpers?', 'hocs?'],
  ['configs?', 'constants?', 'envs?'],
  ['ui', 'pages?', 'views?', 'screens?', 'layouts?', 'components?', 'containers?'],
  ['assets?', 'styles?'],
  ['mocks?'],
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

const configsFactory: LazyFactory<Linter.Config[]> = () => [
  ...baseImportConfigFactory(),
  {
    rules: {
      'simple-import-sort/imports': ['warn', { groups: IMPORT_GROUPS }],
    },
  },
];

export default configsFactory;
