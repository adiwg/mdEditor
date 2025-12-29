'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020, // Updated from 2018
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'prettier' // Add prettier integration
  ],
  env: {
    browser: true
  },
  rules: {
    // Tighten rules for upgrade
    'no-console': 1,
    'ember/no-observers': 'warn',
    'ember/no-classic-classes': 'warn', // Flag classic components for conversion
    'ember/no-classic-components': 'warn', // Flag classic components
    'ember/require-tagless-components': 'warn', // Encourage tagless components
    'ember/no-mixins': 'warn', // Flag mixins for refactoring
    'ember/no-get': 'warn' // Discourage this.get() usage
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true,
        es6: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
