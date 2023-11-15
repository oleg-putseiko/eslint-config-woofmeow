const globAlias = (path) => `@/${path}/**/*`;

/**
 * @typedef { string } Glob
 * @type { { name: string; actualPaths: Glob[]; deprecatedPaths: Glob[] }[] }
 */
const LAYERS = [
  { name: 'app', actualPaths: ['app?(s)'], deprecatedPaths: ['core', 'init'] },
  {
    name: 'processes',
    actualPaths: ['process?(es)'],
    deprecatedPaths: ['flow?(s)', 'workflow?(s)'],
  },
  {
    name: 'pages',
    actualPaths: ['page?(s)'],
    deprecatedPaths: ['screen?(s)', 'view?(s)', 'layout?(s)'],
  },
  {
    name: 'widgets',
    actualPaths: ['widget?(s)'],
    deprecatedPaths: [],
  },
  {
    name: 'features',
    actualPaths: ['feature?(s)'],
    deprecatedPaths: ['component?(s)', 'container?(s)'],
  },
  {
    name: 'entities',
    actualPaths: ['entit@(y|ies)'],
    deprecatedPaths: ['model?(s)'],
  },
  {
    name: 'shared',
    actualPaths: ['shared'],
    deprecatedPaths: ['common', 'lib?(s)'],
  },
];

const RELATED_LAYER_NAME_LIST = LAYERS.map(({ name }) => `\`${name}\``).join(
  ', ',
);

const DEPRECATED_GLOB_ALIASES = LAYERS.flatMap((layer) =>
  layer.deprecatedPaths.map(globAlias),
);
const UNKNOWN_GLOB_ALIASES = [
  `@/!(${LAYERS.flatMap((layer) =>
    layer.actualPaths.concat(layer.deprecatedPaths).join('|'),
  )})/**/*`,
];
const BREAKING_GLOB_ALIASES = ['*(.)/'];

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
            group: BREAKING_GLOB_ALIASES,
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
              `^@/(${layer.actualPaths
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
    const prevPaths = LAYERS.slice(0, index).flatMap((prevLayer) =>
      prevLayer.actualPaths.concat(prevLayer.deprecatedPaths),
    );

    return {
      files: paths.map(globAlias),
      rules: {
        'no-restricted-import': [
          'error',
          {
            patterns: [
              {
                group: prevPaths.map(globAlias),
                message: 'Access to this layer from the current one is denied',
              },
              {
                group: DEPRECATED_GLOB_ALIASES,
                message: `Layer is deprecated. Instead, use layers related to FSD version 2.X.X: ${RELATED_LAYER_NAME_LIST}`,
              },
              {
                group: BREAKING_GLOB_ALIASES,
                message:
                  'Using a relative and absolute paths may result in using an inaccessible layers. Use an aliased path instead',
              },
              {
                group: UNKNOWN_GLOB_ALIASES,
                message: `Unknown layer. Use layers related to FSD version 2.X.X: ${RELATED_LAYER_NAME_LIST}`,
              },
            ],
          },
        ],
      },
    };
  }),
};
