const fs = require('fs');

/**
 * @typedef { string } NamePattern Name pattern compatible with Glob, RegExp and gitignore syntax
 * @typedef { { name: string; actualNames: NamePattern[]; deprecatedNames: NamePattern[] } } Layer
 *
 * @type { Layer[] }
 */
const LAYERS = [
  {
    name: 'app',
    actualNames: ['app', 'apps'],
    deprecatedNames: ['core', 'init'],
  },
  {
    name: 'processes',
    actualNames: ['process', 'processes'],
    deprecatedNames: ['flow', 'flows', 'workflow', 'workflows'],
  },
  {
    name: 'pages',
    actualNames: ['page', 'pages'],
    deprecatedNames: [
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
    actualNames: ['widget', 'widgets'],
    deprecatedNames: [],
  },
  {
    name: 'features',
    actualNames: ['feature', 'features'],
    deprecatedNames: ['component', 'components', 'container', 'containers'],
  },
  {
    name: 'entities',
    actualNames: ['entity', 'entities'],
    deprecatedNames: ['model', 'models'],
  },
  {
    name: 'shared',
    actualNames: ['shared'],
    deprecatedNames: ['common', 'lib', 'libs'],
  },
];

const DEPRECATED_PATH_GROUP = LAYERS.flatMap((layer) =>
  layer.deprecatedNames.flatMap((layerName) => [
    `src/${layerName}/**/*`,
    `@/${layerName}/**/*`,
    `@${layerName}/**/*`,
    `${layerName}/**/*`,
  ]),
);
const BREAKING_PATH_GROUP = ['/', './', '../'];

/**
 * @param { Layer } layer
 *
 * @returns { NamePattern[] } Layer name patterns
 */
const getLayerNames = (layer) =>
  layer.actualNames.concat(layer.deprecatedNames);

/**
 * @param { NamePattern } layerName
 *
 * @returns { string[] } Layer slice names
 */
const getLayerSliceNames = (layerName) => {
  try {
    return fs.readdirSync(`./src/${layerName}`);
  } catch {
    // Fall through to the next search
  }

  try {
    return fs.readdirSync(`./${layerName}`);
  } catch {
    return [];
  }
};

/**
 * @param { Layer[] } layers
 * @param { string | undefined } conjunction
 *
 * @returns { string } User-readable list of layer names
 */
const getLayerNameList = (layers, conjunction = 'and') =>
  layers.reduce((list, { name }, index, array) => {
    if (index === 0) return `\`${name}\``;
    if (index !== array.length - 1) return `${list}, \`${name}\``;
    return `${list} ${conjunction} \`${name}\``;
  }, '');

/**
 * @param { Layer } layer
 * @param { string } sliceName
 *
 * @returns { Linter.ConfigOverride<Linter.RulesRecord> } ESLint config overriding pattern
 */
const buildDeniedLayersPattern = (layer, sliceName) => {
  const index = LAYERS.indexOf(layer);

  const deniedLayerNames = LAYERS.slice(0, index + 1).flatMap(getLayerNames);
  const allowedLayers = LAYERS.slice(index + 1);

  if (deniedLayerNames.length < 1) return null;

  return {
    group: deniedLayerNames
      .flatMap((layerName) => [
        `src/${layerName}/*`,
        `@/${layerName}/*`,
        `@${layerName}/*`,
        `${layerName}/*`,
      ])
      .concat([
        `!src/${layer.name}/${sliceName}`,
        `!src/${layer.name}/${sliceName}/*`,
        `!@/${layer.name}/${sliceName}`,
        `!@/${layer.name}/${sliceName}/*`,
        `!@${layer.name}/${sliceName}`,
        `!@${layer.name}/${sliceName}/*`,
        `!${layer.name}/${sliceName}`,
        `!${layer.name}/${sliceName}/*`,
      ]),
    message:
      index < LAYERS.length - 1
        ? `\n\nAccess to this layer from the current one is denied. Layers allowed for use in the current one: ${getLayerNameList(
            allowedLayers,
          )}`
        : '\n\nAccess to this layer from the current one is denied. This layer cannot use other layers.',
  };
};

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
        getLayerNames(layer).flatMap((name) => [
          `!src/${name}`,
          `!src/${name}/*`,
          `!@/${name}`,
          `!@/${name}/*`,
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
            `^(src/|@/|@)?(${getLayerNames(layer).join('|')})`,
          ]),
          ['^.+\\.s?css$'],
          ['^@/'],
          ['^\\.\\.?/'],
          ['^'],
        ],
      },
    ],
  },
  overrides: LAYERS.flatMap((layer) => {
    const layerNames = layer.actualNames.concat(layer.deprecatedNames);

    return layerNames.flatMap((layerName) => {
      const sliceNames = getLayerSliceNames(layerName);

      return sliceNames.flatMap((sliceName) => {
        const deniedLayersPatterns = buildDeniedLayersPattern(layer, sliceName);

        return {
          files: [`./{,src/}${layerName}/${sliceName}/**/*`],
          rules: {
            'no-restricted-imports': [
              'error',
              {
                patterns: deniedLayersPatterns
                  ? [...BASE_PATTERNS, deniedLayersPatterns]
                  : BASE_PATTERNS,
              },
            ],
          },
        };
      });
    });
  }),
};
