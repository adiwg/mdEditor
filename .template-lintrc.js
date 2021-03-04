'use strict';

module.exports = {
  plugins: ['ember', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    //'no-bare-strings': true
    'attribute-indentation': false,
    'block-indentation': false,
    'simple-unless': false,
    'no-implicit-this': true,
  },
};
