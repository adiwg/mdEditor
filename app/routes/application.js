import Ember from 'ember';

const {
  $,
  A,
  Route,
  Object: EmberObject,
  guidFor,
  RSVP,
  Logger
} = Ember;

export default Route.extend({
  init() {
    this._super(...arguments);

    $(window).bind('beforeunload', (evt) => {
      let dirty = this.currentModel.filter(function(itm) {
        return itm.filterBy('hasDirtyHash').length;
      }).length;

      let message = 'Are you sure you want to leave unsaved work?';

      evt.returnValue = dirty ? message : undefined;

      return evt.returnValue;
    });
  },

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
      title: 'Metadata Records'
    }), EmberObject.create({
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    }), EmberObject.create({
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    })]);

    let idx = 0;

    let mapFn = function(item) {

      meta[idx].set('listId', guidFor(item));
      item.set('meta', meta[idx]);
      idx = ++idx;

      return item;
    };

    return RSVP.map(promises, mapFn);
  },

  /**
   * The current model for the route
   *
   * @return {DS.Model}
   */
  currentModel: function() {
    return this.modelFor(this.routeName);
  },

  actions: {
    error(error) {
      Logger.error(error);

      if (error.status === 404) {
        return this.transitionTo('not-found');
      }

      return this.replaceWith('error')
        .then(function(route) {
          route.controller.set('lastError', error);
        });
    },
  }
});
