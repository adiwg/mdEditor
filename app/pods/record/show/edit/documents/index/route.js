import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, getWithDefault, set } from '@ember/object';

export default class IndexRoute extends Route {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'additionalDocumentation', getWithDefault(model,
      'additionalDocumentation', []));
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
  }
    editDocument(id) {
      this.transitionTo('record.show.edit.documents.citation', id);
    }
}