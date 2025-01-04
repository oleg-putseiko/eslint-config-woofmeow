import flatConfig from '../flat/import-base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

export = compat.eslintrc(flatConfig[0]);
