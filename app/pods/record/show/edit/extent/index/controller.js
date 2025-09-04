import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  
  @action
  addExtent() {
    // Access parent route's actions
    return this.model.parentRoute.addExtent();
  }

  @action
  deleteExtent(id) {
    return this.model.parentRoute.deleteExtent(id);
  }

  @action
  editFeatures(id) {
    return this.model.parentRoute.editFeatures(id);
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }
}
