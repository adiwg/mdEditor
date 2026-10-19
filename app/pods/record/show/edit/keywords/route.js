import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class KeywordsRoute extends Route {
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
}