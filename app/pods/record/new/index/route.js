import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  redirect() {
    let rec = this.store.createRecord('record');

    this.replaceWith('record.new.id', rec.id);
  }
}