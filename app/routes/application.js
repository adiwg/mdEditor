import $ from 'jquery';
import { A } from '@ember/array';
import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { guidFor } from '@ember/object/internals';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import config from 'mdeditor/config/environment';

const {
  APP: {
    defaultProfileId
  }
} = config;

const console = window.console;

export default Route.extend({
  init() {
    this._super(...arguments);

    $(window).bind('beforeunload', (evt) => {
      let dirty = this.currentRouteModel().filter(function (itm) {
        return itm.filterBy('hasDirtyHash').length;
      }).length;

      let message = 'Are you sure you want to leave unsaved work?';

      evt.returnValue = dirty ? message : undefined;

      return evt.returnValue;
    });
  },

  spotlight: service(),
  slider: service(),
  router: service(),

  /**
   * Models for sidebar navigation
   *
   * @return {Ember.RSVP.hash}
   */
  model() {
    let promises = [this.store.findAll('record', {
        reload: true
      }),
      this.store.findAll('contact', {
        reload: true
      }),
      this.store.findAll('dictionary', {
        reload: true
      })
    ];

    let meta = A([EmberObject.create({
      type: 'record',
      list: 'records',
      title: 'Metadata Records',
      icon: 'file-o'
    }), EmberObject.create({
      type: 'contact',
      list: 'contacts',
      title: 'Contacts',
      icon: 'users'
    }), EmberObject.create({
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries',
      icon: 'book'
    })]);

    let idx = 0;

    let mapFn = function (item) {

      meta[idx].set('listId', guidFor(item));
      item.set('meta', meta[idx]);
      idx = ++idx;

      return item;
    };

    return RSVP.map(promises, mapFn).then(result => {
      let profiles = [this.store.findAll('profile', {
          reload: true
        }),
        this.store.findAll('schema', {
          reload: true
        }),
        this.store.findAll('custom-profile', {
          reload: true
        })
      ];

      return RSVP.all(profiles).then(() => result);

      // return result;
    });
  },

  beforeModel() {
    if(!defaultProfileId) {
      this.router.replaceWith('error')
        .then(function (route) {
          route.controller.set('lastError', new Error(
            'A default profile ID is not set in "config/environment/APP"'
          ));
        });
    }
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set('spotlight', this.spotlight);
    controller.set('slider', this.slider);
  },

  /**
   * The current model for the route
   * @method currentRouteModel
   * @return {Object}
   */

  actions: {
    error(error) {
      console.error(error);

      if(error.status === 404) {
        return this.transitionTo('not-found');
      }

      return this.replaceWith('error')
        .then(function (route) {
          route.controller.set('lastError', error);
        });
    },
    didTransition() {
      this.controller.set('currentRoute', this.router.get(
        'currentRouteName'));
    }
  }
});
