import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { get } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(ScrollTo) {
  @service settings;
  @service router;

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
  toList() {
    this.router.transitionTo('record.show.edit.taxonomy');
  }

  @action
  addTaxa() {
    this.controller.model.taxonomicClassification.pushObject({
      _edit: true,
    });
  }

  @action
  addITIS() {
      // Check if itisProxyUrl is configured
      if (!this.get('settings.data.itisProxyUrl')) {
        // Show modal to alert user
        this.controller.set('showItisModal', true);
        return;
      }

    // If itisProxyUrl is configured, proceed to ITIS page
    this.router.transitionTo('record.show.edit.taxonomy.collection.itis');
  }

  @action
  goToSettings() {
    this.controller.set('showItisModal', false);
    this.router.transitionTo('settings.main');
  }

  @action
  editSystem(index) {
      this.router.transitionTo(
        'record.show.edit.taxonomy.collection.system',
        index
      ).then(
        function () {
          this.setScrollTo('system');
        }.bind(this)
      );
  }
}