import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default class ItisRoute extends Route {
  @service router;

  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'ITIS',
    };
  }
  setupController() {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor('record.show.edit'));
    this.controller.set(
      'collectionId',
      get(
        this.controllerFor('record.show.edit.taxonomy.collection'),
        'collectionId'
      )
    );
  }

  @action
  toCollection() {
    this.router.transitionTo('record.show.edit.taxonomy.collection');
  }
}
