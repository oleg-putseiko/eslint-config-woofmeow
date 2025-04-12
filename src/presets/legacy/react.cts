import flatConfig from '../flat/react.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc({ flatConfig, extends: ['./base.cjs'] });
