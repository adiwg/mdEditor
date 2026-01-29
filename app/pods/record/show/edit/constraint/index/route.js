import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'constraint', get(model, 'constraint') ?? []);
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }
}
