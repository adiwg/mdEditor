import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  redirect: function () {
    let rec = this.store.createRecord('dictionary');

    this.replaceWith('dictionary.new.id', rec.id);
  },
});
