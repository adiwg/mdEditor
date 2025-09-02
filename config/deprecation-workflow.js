/* eslint-env node */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-global' },
    { handler: 'log', matchId: 'ember-component.template-only-glimmer-component' }
  ]
};
