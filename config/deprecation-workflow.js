/* eslint-env browser */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-routing.route-router" },
    { handler: "silence", matchId: "ember-data:method-calls-on-destroyed-store" },
    { handler: "silence", matchId: "ember-component.send-action" },
    { handler: "silence", matchId: "ember-runtime.using-array-copy" },
    { handler: "silence", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "silence", matchId: "ember-name-key-usage" },
    { handler: "silence", matchId: "events.remove-all-listeners" },
    { handler: "silence", matchId: "object.new-constructor" },
    { handler: "silence", matchId: "ember-polyfills.deprecate-merge" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "computed-property.volatile" },
    { handler: "silence", matchId: "computed-property.override" },
  ]
};
