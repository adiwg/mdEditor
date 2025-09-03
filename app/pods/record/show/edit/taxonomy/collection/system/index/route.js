import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController(controller) {
    // Call _super for default behavior
    super.setupController(...arguments);

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
