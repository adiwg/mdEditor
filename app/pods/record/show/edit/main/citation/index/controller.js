import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MainCitationIndexController extends Controller {
  @service router;

  @action
  editIdentifier(index) {
    this.router
      .transitionTo('record.show.edit.main.citation.identifier', index)
      .then(() => {
        this.setScrollTo('identifier');
      });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
