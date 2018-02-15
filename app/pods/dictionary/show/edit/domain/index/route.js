import Route from '@ember/routing/route';
import { getWithDefault,get,set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'domain', getWithDefault(model, 'domain', []));
  },

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'dictionary.show.edit.index'));
  },

  actions: {
    editDomain(id) {
      this.transitionTo('dictionary.show.edit.domain.edit', id);
    }
  }
});
