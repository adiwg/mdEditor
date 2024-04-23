import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  redirect() {
    let rec = this.store.createRecord('record');

    this.replaceWith('record.new.id', rec.id);
  }
});
