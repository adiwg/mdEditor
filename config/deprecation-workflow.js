/* eslint-env browser */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'log', matchId: 'ember-routing.route-router' },
    {
      handler: 'silence',
      matchId: 'ember-data:method-calls-on-destroyed-store',
    },
    { handler: 'log', matchId: 'ember-component.send-action' },
    { handler: 'log', matchId: 'ember-runtime.using-array-copy' },
    { handler: 'log', matchId: 'ember-runtime.deprecate-copy-copyable' },
    { handler: 'silence', matchId: 'ember-name-key-usage' },
    { handler: 'silence', matchId: 'events.remove-all-listeners' },
    { handler: 'log', matchId: 'object.new-constructor' },
    { handler: 'log', matchId: 'ember-polyfills.deprecate-merge' },
    { handler: 'log', matchId: 'ember-views.curly-components.jquery-element' },
    { handler: 'log', matchId: 'computed-property.volatile' },
    { handler: 'silence', matchId: 'ember-data:evented-api-usage' },
    { handler: 'silence', matchId: 'isVisible' },
  ],
};
