import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController: function () {
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
  },
  actions: {
    toList() {
      this.transitionTo('record.show.edit.taxonomy');
    },
    addTaxa() {
      this.controller.model.taxonomicClassification.pushObject({
        _edit: true,
      });
    },
    addITIS() {
      this.transitionTo('record.show.edit.taxonomy.collection.itis');
    },
    editSystem(index) {
      this.transitionTo(
        'record.show.edit.taxonomy.collection.system',
        index
      ).then(
        function () {
          this.setScrollTo('system');
        }.bind(this)
      );
    },
  },
});
