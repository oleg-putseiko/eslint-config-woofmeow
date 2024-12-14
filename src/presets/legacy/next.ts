import { config as flatConfig, configsToExtend } from '../flat/next';
import { ConfigCompat } from '../../utils/config-compat';

const compat = new ConfigCompat({ fileUrl: import.meta.url });

export default compat.eslintrc(flatConfig, configsToExtend);
