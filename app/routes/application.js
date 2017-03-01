import Ember from 'ember';

export default Ember.Route.extend({
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

    let meta = Ember.A([Ember.Object.create({
      type: 'record',
      list: 'records',
      title: 'Metadata Records'
    }), Ember.Object.create({
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    }), Ember.Object.create({
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    })]);

    let idx = 0;

    let mapFn = function (item) {

      meta[idx].set('listId', Ember.guidFor(item));
      item.set('meta', meta[idx]);
      idx = ++idx;

      return item;
    };

    return Ember.RSVP.map(promises, mapFn);
  },

  /**
   * The current model for the route
   *
   * @return {DS.Model}
   */
  currentModel: function () {
    return this.modelFor(this.routeName);
  },

  actions: {
    error(error) {
      Ember.Logger.error(error);

      if(error.status === 404) {
        return this.transitionTo('not-found');
      }

      return this.replaceWith('error')
        .then(function (route) {
          route.controller.set('lastError', error);
        });
    },
  }
});
