import { Linter } from 'eslint';

import importAtomicConfig from './configs/import/atomic.js';
import importBaseConfig from './configs/import/base.js';
import importFsdConfig from './configs/import/fsd.js';
import jsonConfig from './configs/json.js';
import nextConfig from './configs/next.js';
import reactConfig from './configs/react.js';
import recommendedConfig from './configs/recommended.js';
import tailwindcssConfig from './configs/tailwindcss.js';
import typescriptConfig from './configs/typescript.js';

type FlatConfigKey =
  | 'import/atomic'
  | 'import/base'
  | 'import/fsd'
  | 'json'
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
  json: jsonConfig,
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
export default { configure, configs };
