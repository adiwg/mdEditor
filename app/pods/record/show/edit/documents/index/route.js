import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';

export default Route.extend({
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'additionalDocumentation', (model.additionalDocumentation === undefined ? [] : model.additionalDocumentation));
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
