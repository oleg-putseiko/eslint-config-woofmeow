import flatConfig from '../flat/next.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc(flatConfig[0], {
  extends: ['next', 'next/core-web-vitals', './react.cjs'],
});
