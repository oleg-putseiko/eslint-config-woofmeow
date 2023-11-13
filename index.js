/**
 * Default preset
 *
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['./presets/general.js', './presets/import-base.js'].map(
    require.resolve,
  ),
};
