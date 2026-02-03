import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;

  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'domain', get(model, 'domain') ?? []);
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set(
      'parentModel',
      this.modelFor('dictionary.show.edit.index')
    );
  }

  @action
  editDomain(id) {
    this.router.transitionTo('dictionary.show.edit.domain.edit', id);
  }
}
