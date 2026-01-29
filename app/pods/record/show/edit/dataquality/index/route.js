import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  afterModel(m) {
    super.afterModel(...arguments);

    let model = get(m, 'json.metadata');
    set(model, 'dataQuality', get(model, 'dataQuality') ?? []);
  }
  setupController() {
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }

  @action
  editDataQuality(id) {
    this.router.transitionTo('record.show.edit.dataquality.edit', id);
  }
}
