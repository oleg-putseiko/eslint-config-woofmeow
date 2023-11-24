/**
 * @typedef { string } Path Path compatible with both Glob and RegExp
 * @typedef { { name: string; actualPaths: Path[]; deprecatedPaths: Path[] } } Layer
 *
 * @type { Layer[] }
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

const DEPRECATED_PATH_GROUP = LAYERS.flatMap((layer) =>
  layer.deprecatedPaths.flatMap((path) => [
    `src/${path}/**/*`,
    `@/${path}/**/*`,
    `@${path}/**/*`,
    `${path}/**/*`,
  ]),
);
const BREAKING_PATH_GROUP = ['/', './', '../'];

/**
 * @type { (layer: Layer) => Path[] }
 */
const getLayerPaths = (layer) =>
  layer.actualPaths.concat(layer.deprecatedPaths);

/**
 * @type { (layer: Layer[], conjunction?: string) => string }
 */
const getLayerNameList = (layers, conjunction = 'and') =>
  layers.reduce((list, { name }, index, array) => {
    if (index === 0) return `\`${name}\``;
    if (index !== array.length - 1) return `${list}, \`${name}\``;
    return `${list} ${conjunction} \`${name}\``;
  }, '');

const BASE_PATTERNS = [
  {
    group: DEPRECATED_PATH_GROUP,
    message: `\n\nLayer is deprecated. Instead, use layers related to FSD version 2.X.X: ${getLayerNameList(
      LAYERS,
      'or',
    )}`,
  },
  {
    group: BREAKING_PATH_GROUP,
    message:
      '\n\nUsing a relative and absolute paths may result in using an inaccessible layers. Use an aliased path instead',
  },
  {
    group: ['src/*', '@/*'].concat(
      LAYERS.flatMap((layer) =>
        getLayerPaths(layer).flatMap((path) => [
          `!src/${path}`,
          `!src/${path}/*`,
          `!@/${path}`,
          `!@/${path}/*`,
        ]),
      ),
    ),
    message: `\n\nUnknown layer, use one related to FSD version 2.X.X: ${getLayerNameList(
      LAYERS,
      'or',
    )}`,
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
              '\n\nUse an aliased paths instead of a relative and absolute ones',
          },
        ],
      },
    ],

    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^@?\\w', '^\\u0000'],
          ...LAYERS.map((layer) => [
            `^(src/|@/|@)?(${getLayerPaths(layer).join('|')})`,
          ]),
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
    const deniedPaths = LAYERS.slice(0, index + 1).flatMap(getLayerPaths);
    const allowedLayers = LAYERS.slice(index + 1);

    const patterns = BASE_PATTERNS.slice(0);

    if (deniedPaths.length > 0) {
      patterns.push({
        group: deniedPaths.flatMap((path) => [
          `src/${path}/**/*`,
          `@/${path}/**/*`,
          `@${path}/**/*`,
          `${path}/**/*`,
        ]),
        message:
          index < LAYERS.length - 1
            ? `\n\nAccess to this layer from the current one is denied. Layers allowed for use in the current one: ${getLayerNameList(
                allowedLayers,
              )}`
            : '\n\nAccess to this layer from the current one is denied. This layer cannot use other layers.',
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
