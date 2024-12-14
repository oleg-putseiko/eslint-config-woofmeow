import { type Linter } from 'eslint';
import { ConfigCompat } from '../../utils/config-compat';

const compat = new ConfigCompat({ fileUrl: import.meta.url });

export const configsToExtend: string[] = ['./import-base.ts'];

export const config: Linter.Config = {
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

export default [...compat.extends(...configsToExtend), config];
