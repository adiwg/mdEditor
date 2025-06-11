import Route from '@ember/routing/route';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default Route.extend(ScrollTo, {
  settings: service(),

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
      // Check if itisProxyUrl is configured
      if (!this.get('settings.data.itisProxyUrl')) {
        // Show modal to alert user
        this.controller.set('showItisModal', true);
        return;
      }

      // If itisProxyUrl is configured, proceed to ITIS page
      this.transitionTo('record.show.edit.taxonomy.collection.itis');
    },

    goToSettings() {
      this.controller.set('showItisModal', false);
      this.transitionTo('settings.main');
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
