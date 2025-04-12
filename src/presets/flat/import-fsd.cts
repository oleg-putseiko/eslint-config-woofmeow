import { type Linter } from 'eslint';
import importBaseConfig from './import-base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

type RestrictedImportPattern = {
  group: string[];
  message?: string;
};

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
  ['^@?\\w', '^\\u0000'],
  ...LAYER_GROUPS.map((group) => [`^(src/|@/|@)?(${group.join('|')})`]),
  ['^.+\\.s?css$'],
  ['^@/'],
  ['^\\.\\.?/'],
  ['^'],
];

const RESTRICTED_IMPORT_PATTERNS: RestrictedImportPattern[] = [
  {
    group: ['/'],
    message: '\n\nUse an aliased paths instead of an absolute ones.',
  },
  {
    group: ['./', '../'],
    message: '\n\nUse an aliased paths instead of a relative ones.',
  },
];

const compat = new ConfigCompat();

const config: Linter.Config[] = compat.compatible({
  rules: {
    'no-restricted-imports': ['warn', { patterns: RESTRICTED_IMPORT_PATTERNS }],
    'simple-import-sort/imports': ['warn', { groups: IMPORT_GROUPS }],
  },
});

export = [...importBaseConfig, ...config] satisfies Linter.Config[];
