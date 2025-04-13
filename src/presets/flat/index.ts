import baseConfig from './base.js';
import importAtomicConfig from './import-atomic.js';
import importBaseConfig from './import-base.js';
import importFsdConfig from './import-fsd.js';
import nextConfig from './next.js';
import reactConfig from './react.js';
import typescriptConfig from './typescript.js';

export default {
  base: baseConfig,
  import: importBaseConfig,
  'import-atomic': importAtomicConfig,
  'import-fsd': importFsdConfig,
  next: nextConfig,
  react: reactConfig,
  typescript: typescriptConfig,
};
