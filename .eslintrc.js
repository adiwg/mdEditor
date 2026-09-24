'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020, // Updated from 2018
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'prettier', // Add prettier integration
  ],
  env: {
    browser: true,
    es2020: true,
  },
  rules: {
    // Tighten rules for upgrade
    'no-console': 1,
    'ember/no-observers': 'warn',
    'ember/no-classic-classes': 'warn', // Flag classic components for conversion
    'ember/no-classic-components': 'warn', // Flag classic components
    'ember/require-tagless-components': 'warn', // Encourage tagless components
    'ember/no-mixins': 'warn', // Flag mixins for refactoring
    'ember/no-get': 'warn', // Discourage this.get() usage

    // Classic-to-Octane migration debt. These report code that is still
    // classic-Ember, not code that is broken, so they are visible but do not
    // gate CI -- that keeps the gate meaningful for genuine defects while the
    // migration is in flight.
    //
    // Burn these down deliberately, a subsystem at a time, with tests around
    // the behavior first. Mechanically rewriting call sites to satisfy these
    // rules has already shipped three user-facing regressions (see cf7a5975
    // and 534583fe, which broke two-way binding in md-textarea,
    // md-markdown-area, and md-codelist-multi).
    'ember/no-controller-access-in-routes': 'warn',
    'ember/classic-decorator-no-classic-methods': 'warn',
    'ember/no-incorrect-calls-with-inline-anonymous-functions': 'warn',
    'ember/no-component-lifecycle-hooks': 'warn',
    'ember/require-computed-property-dependencies': 'warn',
    'ember/classic-decorator-hooks': 'warn',
    'ember/no-jquery': 'warn',
    'ember/no-computed-properties-in-native-classes': 'warn',
    'ember/avoid-leaking-state-in-ember-objects': 'warn',
    'ember/require-return-from-computed': 'warn',
    'ember/use-ember-data-rfc-395-imports': 'warn',
    'ember/use-brace-expansion': 'warn',
    'ember/no-side-effects': 'warn',
    'ember/no-private-routing-service': 'warn',
    'ember/no-new-mixins': 'warn',
    'ember/no-actions-hash': 'warn',
    'ember/require-computed-macros': 'warn',
    'ember/no-on-calls-in-components': 'warn',
    'ember/no-try-invoke': 'warn',
    'ember/no-ember-super-in-es-classes': 'warn',
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        '.prettierrc.js',
        '.stylelintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'playwright.config.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js',
        'e2e/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
        es6: true,
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here

          // this can be removed once the following is fixed
          // https://github.com/mysticatea/eslint-plugin-node/issues/77
          'node/no-unpublished-require': 'off',
        }
      ),
    },
  ],
};
