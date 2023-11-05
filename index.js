module.exports = {
  extends: ['./presets/general.js', './presets/import-base.js'].map(
    require.resolve,
  ),
};
