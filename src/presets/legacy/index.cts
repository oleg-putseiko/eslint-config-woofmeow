import baseConfig from './base.cjs';
import importAtomicConfig from './import-atomic.cjs';
import importBaseConfig from './import-base.cjs';
import importFsdConfig from './import-fsd.cjs';
import nextConfig from './next.cjs';
import reactConfig from './react.cjs';
import typescriptConfig from './typescript.cjs';

export = {
  base: baseConfig,
  'import-atomic': importAtomicConfig,
  'import-base': importBaseConfig,
  'import-fsd': importFsdConfig,
  next: nextConfig,
  react: reactConfig,
  typescript: typescriptConfig,
};
