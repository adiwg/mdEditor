import Component from '@ember/component';
import { inject as service } from '@ember/service';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position'

export default Component.extend({
  /**
  * Input that displays available record profiles.
  *
  * @module mdeditor
  * @submodule components-input
  * @class input/md-select-profile
  * @constructor
  */
  profile: service('custom-profile'),

  /**
   * Update the record profile
   *
   * @method   action.updateProfile
   * @param  {String} profile The new profile.
   */
  updateProfile(profile){
    this.profile.set('active', profile);
    this.record.save();
  },

/**
* Calculate the width of the input.
*
* @method calculatePosition
* @private
* @return {String}
*/
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
     * @method   action.updateProfile
     * @param  {String} profile The new profile.
     */
    updateProfile(profile) {
      this.updateProfile(profile);
    }
  }
});
