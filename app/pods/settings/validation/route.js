import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return this.store.findAll('schema');
  },

  schemas: service(),
});
