import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  setupController() {
    // Call _super for default behavior
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

  @action
  toList() {
    this.transitionTo('record.show.edit.taxonomy');
  }

  @action
  addTaxa() {
    this.controller.model.taxonomicClassification.pushObject({
      _edit: true,
    });
  }

  @action
  addITIS() {
    this.transitionTo('record.show.edit.taxonomy.collection.itis');
  }

  @action
  editSystem(index) {
    this.transitionTo(
      'record.show.edit.taxonomy.collection.system',
      index
    ).then(
      function () {
        this.setScrollTo('system');
      }.bind(this)
    );
  }
}