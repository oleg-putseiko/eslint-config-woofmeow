import flatConfig from '../flat/import-base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc(flatConfig[0], { extends: ['./base.cjs'] });
