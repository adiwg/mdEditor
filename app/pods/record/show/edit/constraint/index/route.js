import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, getWithDefault, set } from '@ember/object';

@classic
export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata.resourceInfo');
    set(model, 'constraint', getWithDefault(model, 'constraint', []));
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }
}