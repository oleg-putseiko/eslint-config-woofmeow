import { type Linter } from 'eslint';

import importAtomicConfigFactory from './configs/import/atomic.js';
import importBaseConfigFactory from './configs/import/base.js';
import importFsdConfigFactory from './configs/import/fsd.js';
import jsonConfigFactory from './configs/json.js';
import nextConfigFactory from './configs/next.js';
import reactConfigFactory from './configs/react.js';
import recommendedConfigFactory from './configs/recommended.js';
import tailwindcssConfigFactory from './configs/tailwindcss.js';
import typescriptConfigFactory from './configs/typescript.js';

import { lazy, LazyFactory, LazyResult } from './utils/lazy.js';

type ConfigKey =
  | 'import/atomic'
  | 'import/base'
  | 'import/fsd'
  | 'json'
  | 'next'
  | 'react'
  | 'recommended'
  | 'tailwindcss'
  | 'typescript';
type Configs = Record<ConfigKey, LazyFactory<Linter.Config[]>>;

const configs: LazyResult<Configs> = lazy({
  'import/atomic': importAtomicConfigFactory,
  'import/base': importBaseConfigFactory,
  'import/fsd': importFsdConfigFactory,
  json: jsonConfigFactory,
  next: nextConfigFactory,
  react: reactConfigFactory,
  recommended: recommendedConfigFactory,
  tailwindcss: tailwindcssConfigFactory,
  typescript: typescriptConfigFactory,
});

const configure = (...args: (Linter.Config | Linter.Config[])[]): Linter.Config[] => {
  return [...configs.recommended, ...args.flat()];
};

export { configure, configs, type Configs };
export default { configure, configs };
