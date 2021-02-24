import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, getWithDefault, set, action } from '@ember/object';

@classic
export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(
      model,
      'additionalDocumentation',
      getWithDefault(model, 'additionalDocumentation', [])
    );
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editDocument(id) {
    this.transitionTo('record.show.edit.documents.citation', id);
  }
}