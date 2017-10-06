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

const {
  LinkComponent,
  Route,
  Component,
  Application,
  get,
  getWithDefault,
  defineProperty,
  computed,
  isNone,
  assert
} = Ember;

let App;

//Ember.MODEL_FACTORY_INJECTIONS = true;

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

//for bootstrap
LinkComponent.reopen({
  attributeBindings: ['data-toggle', 'data-placement']
});
//for crumbly
Route.reopen({
  //breadCrumb: null
  currentRouteModel: function () {
    return this.modelFor(this.routeName);
  }
});
//for profiles
Component.reopen({
  init() {
    this._super(...arguments);

    let profile = get(this, 'profile');
    let path = get(this, 'profilePath');
    let visibility = get(this, 'visibility');
    let isVisible = isNone(visibility) ? true : visibility;

    if(path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');
      defineProperty(this, 'isVisible', computed(
        'profile.active',
        function () {
          let fullPath = 'profiles.' + get(profile, 'active') +
            '.components.' +
            path;

          //console.log(fullPath);
          return getWithDefault(profile, fullPath, isVisible);
        }));
    }
  }
});
export default App;

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
