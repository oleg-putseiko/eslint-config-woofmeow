import { type Linter } from 'eslint';

import baseConfig from './base.js';
import importAtomicConfig from './import/atomic.js';
import importBaseConfig from './import/base.js';
import importFsdConfig from './import/fsd.js';
import nextConfig from './next.js';
import reactConfig from './react.js';
import tailwindcssConfig from './tailwindcss.js';
import typescriptConfig from './typescript.js';

type FlatPresetKey =
  | 'base'
  | 'import/atomic'
  | 'import/base'
  | 'import/fsd'
  | 'next'
  | 'react'
  | 'tailwindcss'
  | 'typescript';

type FlatPresets = Record<FlatPresetKey, Linter.Config[]>;

const presets: FlatPresets = {
  base: baseConfig,
  'import/atomic': importAtomicConfig,
  'import/base': importBaseConfig,
  'import/fsd': importFsdConfig,
  next: nextConfig,
  react: reactConfig,
  tailwindcss: tailwindcssConfig,
  typescript: typescriptConfig,
};

export { presets, type FlatPresets };
export default presets;
