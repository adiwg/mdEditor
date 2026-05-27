'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  ignore: ['**/tests/**/*', '**/*-test.{js,gjs,gts}'],
  rules: {
    'no-passed-in-event-handlers': false,
    // TODO(mdEditor-template-lint): re-enable after translations are fully configured
    'no-bare-strings': false,
    // TODO(mdEditor-template-lint): move actions to controller level and re-enable
    'no-route-action': false,
    'no-curly-component-invocation': {
      allow: ['head-layout', 'to-elsewhere'],
    },
    // TODO(mdEditor-template-lint): re-enable and fix no-curly-component-invocation violations during template clean up
    'no-curly-component-invocation': false,
  },
  overrides: [
    {
      files: '**/tests/**/*.{js,gts,gjs}',
      rules: {
        prettier: false,
      },
    },
  ],
};
