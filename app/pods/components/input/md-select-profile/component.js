/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  profile: service('custom-profile'),
  actions: {
    /**
     * Update the record profile
     *
     * @name   updateProfile
     * @param  {String} profile The new profile.
     */
    updateProfile(profile) {
      this.profile.set('active', profile);
      this.record.save();
    }
  }
});
