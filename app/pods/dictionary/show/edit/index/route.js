import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { set, getWithDefault, get } from '@ember/object';

@classic
export default class IndexRoute extends Route {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.dataDictionary');
    set(model, 'citation', getWithDefault(model, 'citation', {}));
    set(model, 'responsibleParty', getWithDefault(model, 'responsibleParty', {}));
    set(model, 'subject', getWithDefault(model, 'subject', []));
    set(model, 'recommendedUse', getWithDefault(model, 'recommendedUse', []));
    set(model, 'locale', getWithDefault(model, 'locale', []));
    set(model, 'domain', getWithDefault(model, 'domain', []));
    set(model, 'entity', getWithDefault(model, 'entity', []));
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    this.controllerFor('dictionary.show.edit')
      .setProperties({
        onCancel: () => this,
        cancelScope: this
      });
  }
}
