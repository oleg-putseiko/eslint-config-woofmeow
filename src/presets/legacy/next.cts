import flatConfig from '../flat/next.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

const configsToExtend: string[] = [
  'next',
  'next/core-web-vitals',
  './react.cjs',
];

export = compat.eslintrc(flatConfig[0], configsToExtend);
