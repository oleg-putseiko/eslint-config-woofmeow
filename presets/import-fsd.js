/**
 * @typedef { string } Path - Path compatible with both Glob and RegExp
 *
 * @type { { name: string; actualPaths: Path[]; deprecatedPaths: Path[] }[] }
 */
const LAYERS = [
  {
    name: 'app',
    actualPaths: ['app', 'apps'],
    deprecatedPaths: ['core', 'init'],
  },
  {
    name: 'processes',
    actualPaths: ['process', 'processes'],
    deprecatedPaths: ['flow', 'flows', 'workflow', 'workflows'],
  },
  {
    name: 'pages',
    actualPaths: ['page', 'pages'],
    deprecatedPaths: [
      'screen',
      'screens',
      'view',
      'views',
      'layout',
      'layouts',
    ],
  },
  {
    name: 'widgets',
    actualPaths: ['widget', 'widgets'],
    deprecatedPaths: [],
  },
  {
    name: 'features',
    actualPaths: ['feature', 'features'],
    deprecatedPaths: ['component', 'components', 'container', 'containers'],
  },
  {
    name: 'entities',
    actualPaths: ['entity', 'entities'],
    deprecatedPaths: ['model', 'models'],
  },
  {
    name: 'shared',
    actualPaths: ['shared'],
    deprecatedPaths: ['common', 'lib', 'libs'],
  },
];

const RELATED_LAYER_NAME_LIST = LAYERS.reduce((acc, { name }, index, array) => {
  if (index === 0) return name;
  if (index !== array.length - 1) return `${acc}, ${name}`;
  return `${acc} or ${name}`;
}, '');

const DEPRECATED_PATH_GROUP = LAYERS.flatMap((layer) =>
  layer.deprecatedPaths.flatMap((path) => [
    `src/${path}/**/*`,
    `@/${path}/**/*`,
    `@${path}/**/*`,
    `${path}/**/*`,
  ]),
);
const BREAKING_PATH_GROUP = ['/', './', '../'];

const BASE_PATTERNS = [
  {
    group: DEPRECATED_PATH_GROUP,
    message: `Layer is deprecated. Instead, use layers related to FSD version 2.X.X: ${RELATED_LAYER_NAME_LIST}`,
  },
  {
    group: BREAKING_PATH_GROUP,
    message:
      'Using a relative and absolute paths may result in using an inaccessible layers. Use an aliased path instead',
  },
  {
    group: ['src/*', '@/*', '@*'].concat(
      LAYERS.flatMap((layer) =>
        layer.actualPaths
          .concat(layer.deprecatedPaths)
          .flatMap((path) => [
            `!src/${path}`,
            `!src/${path}/*`,
            `!@/${path}`,
            `!@/${path}/*`,
            `!@${path}`,
            `!@${path}/*`,
          ]),
      ),
    ),
    message: `Unknown layer, use one related to FSD version 2.X.X: ${RELATED_LAYER_NAME_LIST}`,
  },
];

/**
 * Import Feature Sliced Design preset related to FSD up to v2.X.X
 *
 * @exports import-fsd
 *
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['./import-base.js'].map(require.resolve),
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: BREAKING_PATH_GROUP,
            message:
              'Use an aliased paths instead of a relative and absolute ones',
          },
        ],
      },
    ],

    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^@?\\w', '^\\u0000'],
          LAYERS.map(
            (layer) =>
              `^(src/|@/|@)?(${layer.actualPaths
                .concat(layer.deprecatedPaths)
                .join('|')})`,
          ),
          ['^.+\\.s?css$'],
          ['^@/'],
          ['^\\.\\.?/'],
          ['^'],
        ],
      },
    ],
  },
  overrides: LAYERS.map((layer, index) => {
    const paths = layer.actualPaths.concat(layer.deprecatedPaths);
    const deniedPaths = LAYERS.slice(0, index + 1).flatMap((prevLayer) =>
      prevLayer.actualPaths.concat(prevLayer.deprecatedPaths),
    );

    const patterns = BASE_PATTERNS.slice(0);

    if (deniedPaths.length > 0) {
      patterns.push({
        group: deniedPaths.flatMap((path) => [
          `src/${path}/**/*`,
          `@/${path}/**/*`,
          `@${path}/**/*`,
          `${path}/**/*`,
        ]),
        message: 'Access to this layer from the current one is denied',
      });
    }

    return {
      files: paths.map((path) => `./{,src/}${path}/**/*`),
      rules: {
        'no-restricted-imports': ['error', { patterns }],
      },
    };
  }),
};
