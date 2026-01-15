import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import EmberObject from '@ember/object';

export default class ValidationRoute extends Route {
  model() {
    return this.store.findAll('schema');
  }
  @service schemas;
}