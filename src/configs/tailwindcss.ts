import { type Linter } from 'eslint';
import { createRequire } from 'node:module';
import { type LazyFactory } from '../utils/lazy';

const require = createRequire(import.meta.url);

const configsFactory: LazyFactory<Linter.Config[]> = () => {
  const tailwindcssPlugin = require('eslint-plugin-tailwindcss');

  return [
    ...tailwindcssPlugin.configs['flat/recommended'],
    {
      plugins: { tailwindcss: tailwindcssPlugin },
      settings: {
        tailwindcss: {
          callees: ['clsx', 'clsxm', 'clsxj'],
          classRegex: '^class(Names?|es)?$',
        },
      },
      rules: {
        'tailwindcss/classnames-order': 'off',
        'tailwindcss/enforces-negative-arbitrary-values': 'off',
        'tailwindcss/enforces-shorthand': 'warn',
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/no-contradicting-classname': 'warn',
        'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
      },
    },
  ];
};

export default configsFactory;
