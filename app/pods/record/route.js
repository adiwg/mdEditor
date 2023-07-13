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

  profileService: service('profile'),

  model() {
    return this.profileService.loadProfiles.perform();
  }
});
