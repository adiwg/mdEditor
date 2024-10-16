import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  profile: service(),

  model() {
    return this.store.findAll('profile');
  },
});
