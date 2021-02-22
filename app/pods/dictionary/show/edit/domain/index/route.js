import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { getWithDefault, get, set, action } from '@ember/object';

@classic
export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'domain', getWithDefault(model, 'domain', []));
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
    this.transitionTo('dictionary.show.edit.domain.edit', id);
  }
}
