/**
 * The mdEditor application instance.
 *
 * @module mdeditor
 * @category docs
 */

// @apidevtools/json-schema-ref-parser references Buffer as a global in browser builds.
// Provide a minimal stub so isBuffer() checks pass without error.
if (typeof Buffer === 'undefined') {
  window.Buffer = { isBuffer: () => false };
}

import Route from '@ember/routing/route';
import Component from '@ember/component';
import Application from '@ember/application';
import { registerDeprecationHandler } from '@ember/debug';
import Resolver from './resolver';

// ember-tooltips@3.6.0 uses the deprecated @ember/string helpers internally.
// There is no app-side fix available; silence this specific deprecation only.
registerDeprecationHandler((message, options, next) => {
  if (options && options.id === 'ember-string.add-package') {
    return;
  }
  next(message, options);
});
import {
  computed,
  defineProperty,
  get,
  //set
} from '@ember/object';
import { inject as service } from '@ember/service';
import {
  isNone
} from '@ember/utils';
import {
  assert
} from '@ember/debug';
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

Route.reopen({
  //breadCrumb: null
  currentRouteModel: function () {
    return this.modelFor(this.routeName);
  }
});
//for profiles
Component.reopen({
  profile: service('custom-profile'),

  init() {
    this._super(...arguments);

    let profile = this.profile;
    let path = this.profilePath;
    let visibility = this.visibility;
    let defaultVisible = isNone(visibility) ? true : visibility;

    if(path !== undefined) {
      assert(`${path} is not a profile path!`, path.charAt(0) !== '.');

      defineProperty(this, '_profileHidden', computed(
        'profile.active',
        function () {
          if(!profile || !profile.activeComponents) {
            return !defaultVisible;
          }

          let visible = get(profile.activeComponents, path) ?? defaultVisible;
          return !visible;
        }));

      // Only add classNameBindings for components with a wrapper element
      if(this.tagName !== '') {
        this.classNameBindings = [...(this.classNameBindings || []), '_profileHidden:md-profile-hidden'];
      }
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
