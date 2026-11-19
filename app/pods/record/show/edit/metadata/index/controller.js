import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MetadataIndexController extends Controller {
  @service router;

  @action
  editIdentifier() {
    this.router
      .transitionTo('record.show.edit.metadata.identifier')
      .then(() => {
        this.setScrollTo('metadata-identifier');
      });
  }

  @action
  editParent() {
    this.router.transitionTo('record.show.edit.metadata.parent').then(() => {
      this.setScrollTo('parent-metadata');
    });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
