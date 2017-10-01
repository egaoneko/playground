// .eslintrc.js
module.exports = {
  'rules': {
    'no-console': 0
  },
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'spread': true
    }
  },
  "globals": {
    "STATIC": true,
    "process.env": true
  }
};
