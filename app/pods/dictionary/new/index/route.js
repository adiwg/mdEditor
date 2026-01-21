import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  redirect() {
    let rec = this.store.createRecord('dictionary');

    this.replaceWith('dictionary.new.id', rec.id);
  }
}