import flatConfig from '../flat/react.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = [
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
];

export = compat.eslintrc(flatConfig[0], configsToExtend);
