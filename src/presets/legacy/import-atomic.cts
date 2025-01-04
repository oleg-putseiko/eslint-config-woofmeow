import flatConfig from '../flat/import-atomic.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = ['./import-base.cjs'];

export = compat.eslintrc(flatConfig[0], configsToExtend);
