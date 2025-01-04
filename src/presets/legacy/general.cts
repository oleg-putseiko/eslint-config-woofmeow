import flatConfig from '../flat/general.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = ['prettier', 'eslint:recommended'];

export = compat.eslintrc(flatConfig[0], configsToExtend);

console.log(compat.eslintrc(flatConfig[0], configsToExtend));
