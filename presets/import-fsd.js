/**
 * Related to FSD up to v2.0.0
 */

const SEGMENT_REGEXPS = [
  ['api', 'services?', 'controllers?', 'requests?', '(queries|query)'],
  ['models?', 'stores?', 'states?'],
  ['libs?', 'utils?', 'helpers?'],
  ['configs?', 'env', 'get-env'],
  ['ui', 'ui-kits?', 'components?', 'views?'],
  ['mocks?'],
];

const LAYER_REGEXPS = [
  ['app', 'core', 'init'],
  ['servers?'],
  ['(entities|entity)', 'models?'],
  ['process(es)?', 'flows?', 'workflows?'],
  ['widgets?'],
  ['features?'],
  ['pages?', 'screens?', 'views?', 'layouts?', 'components?', 'containers?'],
  ['shared', 'common', 'libs?'],
  ['assets?'],
];

const aliasedLayerPaths = LAYER_REGEXPS.map((layerRegExps) =>
  SEGMENT_REGEXPS.flatMap(
    (segmentRegExps) =>
      `^@/(${layerRegExps.join('|')})(/([^/]+))?(/(${segmentRegExps.join(
        '|',
      )}))?`,
  ),
);

module.exports = {
  extends: ['./import-base.js'].map(require.resolve),
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['./', '../'],
            message: 'Use an aliased path instead of a relative one',
          },
        ],
      },
    ],

    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^@?\\w', '^\\u0000'],
          ...aliasedLayerPaths,
          ['^.+\\.s?css$'],
          ['^@/'],
          ['^\\.\\.?/'],
          ['^'],
        ],
      },
    ],
  },
};
