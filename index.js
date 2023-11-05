module.exports = {
  extends: ['./presets/common.js', './presets/import-base.js'].map(
    require.resolve,
  ),
};
