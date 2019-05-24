import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  model() {
    return this.profile.profiles;
  },

  profile: service(),
});
