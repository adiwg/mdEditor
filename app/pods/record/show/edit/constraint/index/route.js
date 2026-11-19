import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = m.json.metadata.resourceInfo;
    set(model, 'constraint', model.constraint ?? []);
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }
}
