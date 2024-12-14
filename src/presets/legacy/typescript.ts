import { config as flatConfig } from '../flat/typescript';
import { ConfigCompat } from '../../utils/config-compat';

const compat = new ConfigCompat();

export default compat.eslintrc(flatConfig);
