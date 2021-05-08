module.exports = {
  root: true,
  env: {
    "browser": true,
    "amd": true,
    "node": true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-debugger": "off"
  }
};
