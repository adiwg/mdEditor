/**
 * The mdEditor application instance.
 *
 * @module mdeditor
 * @category docs
 */

import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
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

/**
 * Components used to create objects or arrays of objects.
 *
 * @module mdeditor
 * @submodule components-object
 * @main components-object
 * @category docs
 */

 /**
  * Components used to input scalar or arrays of scalar values.
  *
  * @module mdeditor
  * @submodule components-input
  * @main components-input
  * @category docs
  */
