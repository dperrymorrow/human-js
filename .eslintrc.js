module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 180 }],
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
  },
};
