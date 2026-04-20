import { Linter } from 'eslint';

import importAtomicConfig from './presets/import/atomic.js';
import importBaseConfig from './presets/import/base.js';
import importFsdConfig from './presets/import/fsd.js';
import nextConfig from './presets/next.js';
import reactConfig from './presets/react.js';
import recommendedConfig from './presets/recommended.js';
import tailwindcssConfig from './presets/tailwindcss.js';
import typescriptConfig from './presets/typescript.js';

type FlatConfigKey =
  | 'import/atomic'
  | 'import/base'
  | 'import/fsd'
  | 'next'
  | 'react'
  | 'recommended'
  | 'tailwindcss'
  | 'typescript';

type FlatConfigs = Record<FlatConfigKey, Linter.Config[]>;

const configs: FlatConfigs = {
  'import/atomic': importAtomicConfig,
  'import/base': importBaseConfig,
  'import/fsd': importFsdConfig,
  next: nextConfig,
  react: reactConfig,
  recommended: recommendedConfig,
  tailwindcss: tailwindcssConfig,
  typescript: typescriptConfig,
};

const configure = (...args: (Linter.Config | Linter.Config[])[]): Linter.Config[] => {
  return [...configs.recommended, ...args.flat()];
};

export { configure, configs, type FlatConfigs };
export default configs;
