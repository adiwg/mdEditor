import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MetadataIndexController extends Controller {
  @service router;

  @action
  editIdentifier() {
    this.router
      .transitionToRoute('record.show.edit.metadata.identifier')
      .then(() => {
        this.setScrollTo('metadata-identifier');
      });
  }

  @action
  editAlternate(index) {
    this.router
      .transitionToRoute('record.show.edit.metadata.alternate.index', index)
      .then(() => {
        this.setScrollTo('alternate-metadata');
      });
  }

  @action
  editParent() {
    this.router
      .transitionToRoute('record.show.edit.metadata.parent')
      .then(() => {
        this.setScrollTo('parent-metadata');
      });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
