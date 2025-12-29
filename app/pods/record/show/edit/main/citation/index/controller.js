import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  
  @action
  editIdentifier(index) {
    return this.model.route.editIdentifier(index);
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }
}
