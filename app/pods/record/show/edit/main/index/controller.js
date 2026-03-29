import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MainIndexController extends Controller {
  @service router;

  @action
  editCitation(scrollTo) {
    this.router.transitionToRoute('record.show.edit.main.citation').then(() => {
      this.setScrollTo(scrollTo);
    });
  }

  @action
  editId() {
    this.router.transitionToRoute('record.show.edit.metadata.identifier', {
      queryParams: {
        scrollTo: 'identifier',
      },
    });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
