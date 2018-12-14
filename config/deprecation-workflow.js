/* eslint-env browser */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [{
      handler: "silence",
      matchId: "ember-routing.route-router"
    },
    {
      handler: "silence",
      matchId: "ember-component.send-action"
    },
    {
      handler: "silence",
      matchId: "ember-runtime.deprecate-copy-copyable"
    },
    {
      handler: "silence",
      matchId: "ember-runtime.using-array-copy"
    },
    {
      handler: "silence",
      matchId: "ember-metal.getting-each"
    },
    {
      handler: "silence",
      matchId: "ember-routing.route-router"
    },
    {
      handler: "silence",
      matchId: "ember-polyfills.deprecate-merge"
    },
    {
      handler: "silence",
      matchId: "remove-handler-infos"
    }
  ]
};
