import flatConfig from '../flat/typescript.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc({ flatConfig, extends: ['./base.cjs'] });
