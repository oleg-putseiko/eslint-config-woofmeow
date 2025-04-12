import { type Linter } from 'eslint';
import globals from 'globals';
import reactConfig from '../react.cjs';
import { ConfigCompat } from '../../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const config: Linter.Config[] = compat.compatible({
  files: ['src/pages/**/*.{js,jsx,ts,tsx}', 'src/app/**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          direct: false,
          named: true,
        },
      },
    ],
  },
});

export = [
  ...compat.toFlat(
    './compatible/next.cjs',
    './compatible/next-core-web-vitals.cjs',
  ),
  ...reactConfig,
  ...config,
] satisfies Linter.Config[];
