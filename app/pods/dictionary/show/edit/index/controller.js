import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  queryParams = ['scrollTo'];
  scrollTo = '';

  @action
  editCitation(scrollTo) {
    this.transitionToRoute('dictionary.show.edit.citation')
      .then(() => {
        this.setScrollTo(scrollTo);
      });
  }

  @action
  setScrollTo(scrollTo) {
    this.set('scrollTo', scrollTo || '');
  }
}
