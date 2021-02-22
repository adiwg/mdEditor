import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { getWithDefault, get, set, action } from '@ember/object';
import { once } from '@ember/runloop';

@classic
export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.dataDictionary');

    once(this, () => {
      set(model, 'entity', getWithDefault(model, 'entity', []));
    });
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
  editEntity(id) {
    this.transitionTo('dictionary.show.edit.entity.edit', id);
  }
}
