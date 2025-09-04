import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  
  @action
  editCitation(scrollTo) {
    return this.model.route.editCitation(scrollTo);
  }

  @action
  editId() {
    return this.model.route.editId();
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }
}
