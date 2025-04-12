import flatConfig from '../flat/base.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

export = compat.toEslintrc({
  flatConfig,
  extends: ['prettier', 'eslint:recommended'],
});
