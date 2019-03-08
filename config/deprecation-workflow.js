/* eslint-env browser */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "log", matchId: "ember-routing.route-router" },
    { handler: "log", matchId: "ember-data:method-calls-on-destroyed-store" },
    { handler: "log", matchId: "ember-component.send-action" },
    { handler: "log", matchId: "ember-runtime.using-array-copy" },
    { handler: "log", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "log", matchId: "ember-name-key-usage" },
    { handler: "log", matchId: "events.remove-all-listeners" },
    { handler: "log", matchId: "object.new-constructor" },
    { handler: "log", matchId: "ember-polyfills.deprecate-merge" },
  ]
};
