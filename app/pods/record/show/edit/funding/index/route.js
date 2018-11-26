import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'funding', A(getWithDefault(model, 'funding', [])));
  },

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  },

  actions: {
    editAllocation(id) {
      this.transitionTo('record.show.edit.funding.allocation', id);
    }
  }
});
