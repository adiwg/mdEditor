import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TaxonomyCollectionIndexController extends Controller {
  @service router;
  @service settings;

  showItisModal = false;

  @action
  toList() {
    this.router.transitionTo('record.show.edit.taxonomy');
  }

  @action
  addTaxa() {
    this.model.taxonomicClassification.pushObject({
      _edit: true,
    });
  }

  @action
  addITIS() {
    if (!this.settings.data?.itisProxyUrl) {
      this.set('showItisModal', true);
      return;
    }

    this.router.transitionTo('record.show.edit.taxonomy.collection.itis');
  }

  @action
  goToSettings() {
    this.set('showItisModal', false);
    this.router.transitionTo('settings.main');
  }

  @action
  hideItisModal() {
    this.set('showItisModal', false);
  }

  @action
  editSystem(index) {
    this.router
      .transitionTo('record.show.edit.taxonomy.collection.system', index)
      .then(() => {
        this.setScrollTo('system');
      });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
