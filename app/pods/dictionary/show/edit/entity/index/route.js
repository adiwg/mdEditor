import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get, set } from '@ember/object';
import { once } from '@ember/runloop';

export default class IndexRoute extends Route {
  afterModel(m) {
    this._super(...arguments);

    let model = get(m, 'json.dataDictionary');

    once(this, () => {
      set(model, 'entity', get(model, 'entity', []));
    });
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set(
      'parentModel',
      this.modelFor('dictionary.show.edit.index')
    );
  }
  editEntity(id) {
    this.transitionTo('dictionary.show.edit.entity.edit', id);
  }
}
