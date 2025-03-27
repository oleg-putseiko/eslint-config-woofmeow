import flatConfig from '../flat/react.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc(flatConfig[0], {
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    './base.cjs',
  ],
});
