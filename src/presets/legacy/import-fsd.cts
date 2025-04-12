import flatConfig from '../flat/import-fsd.cjs';
import { ConfigCompat } from '../../utils/config-compat.cjs';

const compat = new ConfigCompat({ fileUrl: __filename });

export = compat.toEslintrc({
  flatConfig,
  extends: ['plugin:import-fsd/recommended-legacy', './import-base.cjs'],
});
