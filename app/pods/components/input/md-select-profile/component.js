/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import { inject as service } from '@ember/service';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position'

export default Component.extend({
  profile: service('custom-profile'),

  updateProfile(profile){
    this.profile.set('active', profile);
    this.record.save();
  },

  calculatePosition() {
    let originalValue = calculatePosition(...arguments);
    originalValue.style['min-width'] =   originalValue.style.width + 'px';
    originalValue.style.width = 'auto';
    originalValue.style['max-width'] = '250px';
    return originalValue;
  },

  actions: {
    /**
     * Update the record profile
     *
     * @name   updateProfile
     * @param  {String} profile The new profile.
     */
    updateProfile(profile) {
      this.updateProfile(profile);
    }
  }
});
