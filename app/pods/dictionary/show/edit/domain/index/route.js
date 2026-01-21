import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, set } from '@ember/object';

export default class IndexRoute extends Route {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'domain', get(model, 'domain', []));
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set(
      'parentModel',
      this.modelFor('dictionary.show.edit.index')
    );
  }
  editDomain(id) {
    this.transitionTo('dictionary.show.edit.domain.edit', id);
  }
}
