import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class MainCitationIndexController extends Controller {
  @action
  editIdentifier(index) {
    this.transitionToRoute(
      'record.show.edit.main.citation.identifier',
      index
    ).then(() => {
      this.setScrollTo('identifier');
    });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
