import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  },

  profile: service(),

  model() {
    return this.profileService.loadProfiles.perform();
  }
});
