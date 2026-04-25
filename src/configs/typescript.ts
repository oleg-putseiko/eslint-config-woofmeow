import { Linter } from 'eslint';
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
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': [
        'warn',
        { allow: ['constructors', 'arrowFunctions'] },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        { ignorePrimitives: true, ignoreBooleanCoercion: true },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: true,
          allowArray: true,
          allowBoolean: true,
          allowNever: true,
          allowNullish: true,
          allowNumber: true,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
].map<Linter.Config>(
  (config) => ({ ...config, files: ['**/*.{ts,cts,mts,tsx}'] }) as Linter.Config,
);

export default configs;
