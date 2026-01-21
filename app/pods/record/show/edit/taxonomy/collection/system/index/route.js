import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController(controller) {
    // Call _super for default behavior
    this._super(...arguments);

    let systemId = this.paramsFor(
        'record.show.edit.taxonomy.collection.system')
      .system_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('systemId', systemId);
  }

  @action
  goBack() {
    this.transitionTo('record.show.edit.taxonomy.collection');
  }
}