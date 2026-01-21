/**
 * The mdEditor application instance.
 *
 * @module mdeditor
 * @category docs
 */

import Route from '@ember/routing/route';
import Component from '@ember/component';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import {
  computed,
  defineProperty,
  get,
  //set
} from '@ember/object';
import {
  isNone
} from '@ember/utils';
import {
  assert
} from '@ember/debug';
// import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let events = {
  // add support for the blur event
  blur: 'blur'
}

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

//for routes
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

    let profile = this.profile;
    let path = this.profilePath;
    let visibility = this.visibility;
    let isVisible = isNone(visibility) ? true : visibility;

    if(path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');

      // generate profile definition
      // path.split('.').reduce((acc, curr, idx) => {
      //   let pp = idx ? `${acc}.${curr}` : curr;
      //   window.console.log(pp);
      //   if(!get(window.mdProfile, pp)) {
      //     set(window.mdProfile, pp, {
      //       //visible: true
      //     });
      //   }
      //   return pp;
      // }, '');

      defineProperty(this, 'isVisible', computed(
        'profile.active',
        function () {
          if(!profile.activeComponents) {
            return isVisible;
          }

          return get(profile.activeComponents, path) ?? isVisible;
        }));
    }
  }
});

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
