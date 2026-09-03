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

// @jsdevtools/ono (a dependency of json-schema-ref-parser, used by
// services/schemas.js's fetchSchemas task) imports Node's `util` module,
// whose browser polyfill references the bare global `process` at module
// top level (`if (process.env.NODE_DEBUG)`), unguarded by a typeof check -
// throws ReferenceError: process is not defined the instant it's
// evaluated. Same root cause as the Buffer stub above, just the other
// Node global this dependency chain expects to exist.
if (typeof process === 'undefined') {
  window.process = { env: {}, nextTick: (fn, ...args) => setTimeout(() => fn(...args), 0) };
}

import Route from '@ember/routing/route';
import Component from '@ember/component';
import Application from '@ember/application';
import { registerDeprecationHandler } from '@ember/debug';
import Resolver from './resolver';

// ember-data 5.x's reactivity (used by Model/RecordArray/etc.) requires this
// explicit install - the old implicit wiring via the now-deprecated
// `@ember-data/tracking` package is gone.
import '@warp-drive/ember/install';

// ember-tooltips@3.6.0 uses the deprecated @ember/string helpers internally.
// There is no app-side fix available; silence this specific deprecation only.
//
// ember-cli-flash.deprecate-injection-factories: fires once at boot because we
// set flashMessageDefaults.injectionFactories to [] (see config/environment.js)
// to opt out of the addon's now-dead automatic `application.inject()` calls -
// we already inject `@service flashMessages` explicitly everywhere it's used,
// which is exactly what the addon is asking for.
//
// warp-drive:deprecate-legacy-request-methods: ember-pouch's adapter calls
// the deprecated store.modelFor(type) in two hot paths - onChange() (fires
// on every local db write and every replication event) and _init() (fires
// on every findAll/createRecord/updateRecord) - see
// node_modules/ember-pouch/addon/adapters/pouch.js. Not fixable app-side:
// the suggested replacement, store.schema.fields({type}), returns a fields
// map, not a Model class, and ember-pouch's code needs the actual class
// (eachRelationship, existence-checking) - a real fix means rewriting
// ember-pouch's internals against warp-drive's modern schema API, not a
// like-for-like swap. Silencing only this one; not removed until
// @warp-drive/core 6.0, so no functional risk today.
registerDeprecationHandler((message, options, next) => {
  if (
    options &&
    (options.id === 'ember-string.add-package' ||
      options.id === 'ember-cli-flash.deprecate-injection-factories' ||
      options.id === 'warp-drive:deprecate-legacy-request-methods')
  ) {
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
