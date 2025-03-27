import flatConfig from '../flat/general.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat();

export = compat.toEslintrc(flatConfig[0], {
  extends: ['prettier', 'eslint:recommended'],
});
