/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['./index.js'].map(require.resolve),
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
