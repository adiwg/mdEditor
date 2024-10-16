import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(
      model,
      'associatedResource',
      get(model, 'associatedResource') !== undefined
        ? get(model, 'associatedResource')
        : [],
    );
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  },

  actions: {
    editResource(id) {
      this.transitionTo('record.show.edit.associated.resource', id);
    }, //,
    // templateClass() {
    //   return Ember.Object.extend({
    //     init() {
    //       this._super(...arguments);
    //       //this.set('authority', {});
    //     }
    //   });
    // }
  },
});
