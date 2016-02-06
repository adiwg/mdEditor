import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

//for bootstrap
Ember.LinkComponent.reopen({
  attributeBindings: ['data-toggle', 'data-placement']
});
//for crumbly
Ember.Route.reopen({
  //breadCrumb: null
});

export default App;
