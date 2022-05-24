import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'resourceLineage', getWithDefault(model, 'resourceLineage', []));
  },

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  },

  actions: {
    editLineage(id) {
      this.transitionTo('record.show.edit.lineage.lineageobject', id);
    }//,
    // templateClass() {
    //   return Ember.Object.extend({
    //     init() {
    //       this._super(...arguments);
    //       //this.set('authority', {});
    //     }
    //   });
    // }
  }
});
