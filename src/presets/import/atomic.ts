import { type Linter } from 'eslint';

import baseImportConfig from '../base';

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
  ['^@?\\w', '^\\u0000'],
  ...LAYER_GROUPS.map((group) => [`^(src/|@/|@)?(${group.join('|')})`]),
  ['^@/'],
  ['^~'],
  ['^.+\\.s?css$'],
  ['^\\.\\.?/'],
  ['^'],
];

const configs: Linter.Config[] = [
  ...baseImportConfig,
  {
    rules: {
      'simple-import-sort/imports': ['warn', { groups: IMPORT_GROUPS }],
    },
  },
];

export default configs;
