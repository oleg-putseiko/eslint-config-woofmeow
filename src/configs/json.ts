import { type Linter } from 'eslint';
import jsoncPlugin from 'eslint-plugin-jsonc';
import { type LazyFactory } from '../utils/lazy';

const JSONC_LIKE_FILES = [
  '**/.vscode/**/*.json',
  '**/.vscode/**/*.code-snippets',
  '**/.devcontainer/**/*.json',
  '**/tsconfig.json',
  '**/tsconfig.*.json',
  '**/jsconfig.json',
  '**/turbo.json',
];

const configsFactory: LazyFactory<Linter.Config[]> = () => [
  {
    ignores: [
      '!**/.vscode',
      '**/.vscode/**',
      '!**/.vscode/**/',
      '!**/.vscode/**/*.json',
      '!**/.vscode/**/*.jsonc',
      '!**/.vscode/**/*.json5',
      '!**/.vscode/**/*.code-snippets',
    ],
  },

  ...jsoncPlugin.configs['flat/recommended-with-json'].map((config) => ({
    ...config,
    files: ['**/*.json'],
    ignores: JSONC_LIKE_FILES,
  })),

  ...jsoncPlugin.configs['flat/recommended-with-jsonc'].map((config) => ({
    ...config,
    files: ['**/*.jsonc', ...JSONC_LIKE_FILES],
    rules: {
      ...config.rules,
      'jsonc/no-comments': 'off',
      'jsonc/comma-dangle': 'off',
    } satisfies Linter.RulesRecord,
  })),

  ...jsoncPlugin.configs['flat/recommended-with-json5'].map((config) => ({
    ...config,
    files: ['**/*.json5'],
    rules: {
      ...config.rules,
      'jsonc/no-comments': 'off',
    } satisfies Linter.RulesRecord,
  })),
];

export default configsFactory;
