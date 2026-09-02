import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {

    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit.main'));
    this.controller.set(
      'lineageId',
      this.controllerFor('record.show.edit.lineage.lineageobject').lineageId
    );
  }
}
