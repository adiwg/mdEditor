import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set(
      'collectionId',
      get(
        this.controllerFor('record.show.edit.taxonomy.collection'),
        'collectionId'
      )
    );
  }
}
