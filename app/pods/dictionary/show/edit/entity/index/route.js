import Route from '@ember/routing/route';
import {
  getWithDefault,
  get,
  set
} from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'entity', getWithDefault(model, 'entity', []));
  },

  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit.index'));
  },

  actions: {
    editEntity(id) {
      this.transitionTo('dictionary.show.edit.entity.edit', id);
    }
  }
});
