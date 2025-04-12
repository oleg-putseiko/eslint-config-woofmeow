import flatConfig from '../flat/import-atomic.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc({ flatConfig, extends: ['./import-base.cjs'] });
