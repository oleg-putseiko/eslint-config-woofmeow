/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  extends: ['./index.js'].map(require.resolve),
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
