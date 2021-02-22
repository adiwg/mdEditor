'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],

  extends: ['octane', 'ember-template-lint-plugin-prettier:octane'],

  rules: {
    //'no-bare-strings': true
    'attribute-indentation': false,
    'block-indentation': false,
    'simple-unless': false,
    'no-implicit-this': true,
  },
};
