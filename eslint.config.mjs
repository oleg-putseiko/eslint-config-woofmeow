import globals from 'globals';

// eslint-disable-next-line no-restricted-exports
export default [
  {
    ignores: [
      '**/node_modules',
      '**/.pnp',
      '**/.pnp.js',
      '**/.yarn',
      '**/yarn.lock',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/.pnpm-debug.log*',
      '**/coverage',
      '**/build',
      '**/dist',
      '**/.cache',
      '**/.husky',
      '**/.eslintignore',
      '**/.prettierignore',
      '**/.DS_Store',
      '**/*.pem',
      '**/.env',
      '**/.env*.local',
      '.vscode/*',
      '!.vscode/extensions.json',
      '**/.idea',
      '**/*.suo',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
