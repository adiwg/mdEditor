import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  redirect() {
    let rec = this.store.createRecord('contact');

    this.replaceWith('contact.new.id', rec.id);
  }
}