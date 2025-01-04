import flatConfig from '../flat/import-fsd.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = ['./import-base.cjs'];

export = compat.eslintrc(flatConfig[0], configsToExtend);
