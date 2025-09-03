import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';

@classic
export default class ItisRoute extends Route {
  init() {
    super.init(...arguments);

    this.breadCrumb = {
      "title": "ITIS"
    };
  }

  setupController() {
    // Call _super for default behavior
    super.setupController(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('collectionId', get(this.controllerFor(
        'record.show.edit.taxonomy.collection'),
      'collectionId'));
  }

  @action
  toCollection() {
    this.transitionTo('record.show.edit.taxonomy.collection');
  }
}
