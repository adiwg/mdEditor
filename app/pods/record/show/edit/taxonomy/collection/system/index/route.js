import Route from '@ember/routing/route';
import { action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service router;

  setupController(controller) {
    // Call _super for default behavior
    this._super(...arguments);

    let systemId = this.paramsFor(
      'record.show.edit.taxonomy.collection.system'
    ).system_id;

    controller.set('parentModel', this.modelFor('record.show.edit'));
    controller.set('systemId', systemId);
  }

  @action
  goBack() {
    this.router.transitionTo('record.show.edit.taxonomy.collection');
  }
}
