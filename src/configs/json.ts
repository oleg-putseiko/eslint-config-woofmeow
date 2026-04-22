import { Linter } from 'eslint';
import jsoncPlugin from 'eslint-plugin-jsonc';

const configs: Linter.Config[] = [
  { ignores: ['!**/.vscode/settings.json', '!**/.vscode/extensions.json'] },
  ...jsoncPlugin.configs['flat/recommended-with-json'],
  ...jsoncPlugin.configs['flat/recommended-with-jsonc'],
  ...jsoncPlugin.configs['flat/recommended-with-json5'],
  {
    files: ['**/*.jsonc', '**/*.json5'],
    rules: {
      'jsonc/no-comments': 'off',
    },
  },
];

export default configs;
