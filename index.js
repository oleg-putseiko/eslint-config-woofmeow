/**
 * Default preset
 *
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['./presets/general.js'].map(require.resolve),
};
