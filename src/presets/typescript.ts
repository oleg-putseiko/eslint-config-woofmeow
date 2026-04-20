import { type Linter } from 'eslint';
import tseslint from 'typescript-eslint';

const FILE_EXTENSIONS: string[] = [
  '.ts',
  '.cts',
  '.mts',
  '.d.ts',
  '.d.cts',
  '.d.mts',
  '.tsx',
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.json',
  '.node',
];

const configs: Linter.Config[] = [
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,cts,mts,tsx}'],
    settings: {
      'import/extensions': FILE_EXTENSIONS,
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/parsers': { '@typescript-eslint/parser': FILE_EXTENSIONS },
      'import/resolver': { node: { extensions: FILE_EXTENSIONS } },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];

export default configs;
