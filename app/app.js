/**
 * The mdEditor application instance.
 *
 * @module mdeditor
 * @category docs
 */

import Application from '@ember/application';
import Resolver from 'ember-resolver';
// import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'mdeditor/config/environment';
import LinkComponent from '@ember/routing/link-component';
import './font-awesome';

let events = {
  // add support for the blur event
  blur: 'blur',
};

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
  customEvents = events;
}

// window.mdProfile = {
//   // record:{},contact:{},dictionary:{}
// };

loadInitializers(App, config.modulePrefix);

//for bootstrap - add data attributes to LinkComponent
if (LinkComponent && LinkComponent.reopen) {
  LinkComponent.reopen({
    attributeBindings: ['data-toggle', 'data-placement'],
  });
}

// Removed the instance initializer approach for LinkComponent attributes
// Now handled directly in app.js above

//for crumbly - use RouteExtensionMixin in specific routes that need currentRouteModel
//for profiles - use BaseProfileComponent or ProfileMixin in components that need profile support

/**
* Models for the mdEditor data store

* @main data-models
* @module mdeditor
* @submodule data-models
* @category docs
*/

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

/**
 * Components used as UI controls.
 *
 * @module mdeditor
 * @submodule components-control
 * @main components-control
 * @category docs
 */

/**
 * Mixins.
 *
 * @module mdeditor
 * @submodule mixins
 * @main mixins
 * @category docs
 */
