/* eslint-env node */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-global' },
    {
      handler: 'log',
      matchId: 'ember-component.template-only-glimmer-component',
    },
    { handler: 'log', matchId: 'has-block-and-has-block-params' },
    { handler: 'log', matchId: 'ember-glimmer.with-syntax' },
    { handler: 'log', matchId: 'ember-glimmer.link-to.positional-arguments' },
  ],
};
