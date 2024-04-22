import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'additionalDocumentation', get(model, 'additionalDocumentation') !== undefined ? get(model, 'additionalDocumentation') : []);
  },

  setupController: function() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  },

  actions: {
    editDocument(id) {
      this.transitionTo('record.show.edit.documents.citation', id);
    }
  }
});
