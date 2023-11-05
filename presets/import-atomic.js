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
          ['^@/types?', '^@/definitions?'],
          ['^@/servers?'],
          ['^@/services?', '^@/api', '^@/requests?', '^@/(queries|query)'],
          ['^@/controllers?', '^@/stores?', '^@/states?'],
          ['^@/libs?', '^@/hooks?', '^@/utils?', '^@/helpers?'],
          ['^@/configs?', '^@/constants?', '^@/envs?'],
          [
            '^@/ui',
            '^@/pages?',
            '^@/views?',
            '^@/screens?',
            '^@/layouts?',
            '^@/components?',
            '^@/containers?',
            '^@/hocs?',
          ],
          ['^@/assets?', '^@/styles?', '^.+\\.s?css$'],
          ['^@/'],
          ['^@/mocks?'],
          ['^\\.\\.?/'],
          ['^'],
        ],
      },
    ],
  },
};
