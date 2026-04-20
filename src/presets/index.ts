import { type Linter } from 'eslint';

import baseConfig from './base';
import importAtomicConfig from './import/import-atomic';
import importBaseConfig from './import/base';
import importFsdConfig from './import/import-fsd';
import nextConfig from './next';
import reactConfig from './react';
import typescriptConfig from './typescript';

type FlatPresetKey =
  | 'base'
  | 'import'
  | 'import-atomic'
  | 'import-fsd'
  | 'next'
  | 'react'
  | 'typescript';

type FlatPresets = Record<FlatPresetKey, Linter.Config[]>;

const presets: FlatPresets = {
  base: baseConfig,
  import: importBaseConfig,
  'import-atomic': importAtomicConfig,
  'import-fsd': importFsdConfig,
  next: nextConfig,
  react: reactConfig,
  typescript: typescriptConfig,
};

export { presets, type FlatPresets };
export default presets;
