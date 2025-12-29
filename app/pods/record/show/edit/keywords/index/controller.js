import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  
  @action
  addThesaurus() {
    return this.model.route.addThesaurus();
  }

  @action
  deleteThesaurus(id) {
    return this.model.route.deleteThesaurus(id);
  }

  @action
  editThesaurus(id) {
    return this.model.route.editThesaurus(id);
  }

  @action
  selectThesaurus(selected, thesaurus) {
    return this.model.route.selectThesaurus(selected, thesaurus);
  }

  @action
  addKeyword(model, obj) {
    let k = obj ? obj : {};
    model.pushObject(k);
  }

  @action
  deleteKeyword(model, obj) {
    if(typeof obj === 'number') {
      model.removeAt(obj);
    } else {
      model.removeObject(obj);
    }
  }

  @action
  setScrollTo(value) {
    this.set('scrollTo', value);
  }
}
