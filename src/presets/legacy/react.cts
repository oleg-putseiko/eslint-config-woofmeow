import flatConfig from '../flat/react.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

export = compat.toEslintrc(flatConfig[0], {
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
});
