import Route from '@ember/routing/route';
import {
  get
} from '@ember/object';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      "title": "ITIS"
    };
  },
  setupController: function () {
    // Call _super for default behavior
    this._super(...arguments);

    this.controller.set('parentModel', this.modelFor(
      'record.show.edit'));
    this.controller.set('collectionId', get(this.controllerFor(
        'record.show.edit.taxonomy.collection'),
      'collectionId'));
  },
  actions: {
    toCollection() {
      this.transitionTo('record.show.edit.taxonomy.collection');
    }
  }
});
