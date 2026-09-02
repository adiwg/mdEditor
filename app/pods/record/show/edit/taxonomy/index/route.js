import Route from '@ember/routing/route';
import { set } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(m) {
    super.afterModel(...arguments);

    let model = m.json.metadata.resourceInfo;
    set(model, 'taxonomy', model.taxonomy ?? []);
  }
  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
  }
}
