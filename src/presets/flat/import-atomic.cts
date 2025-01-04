import { type Linter } from 'eslint';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = ['./import-base.cjs'];

const config: Linter.Config = {
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

export = [
  config,
  ...compat.extends(...configsToExtend),
] satisfies Linter.Config[];
