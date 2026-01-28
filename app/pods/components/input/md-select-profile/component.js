import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position'

@classic
export default class MdSelectProfileComponent extends Component {
  /**
  * Input that displays available record profiles.
  *
  * @module mdeditor
  * @submodule components-input
  * @class input/md-select-profile
  * @constructor
  */
  @service('custom-profile') profile;

  /**
   * Update the record profile
   *
   * @param  {String} profile The new profile.
   */
  @action
  updateProfile(profile){
    this.profile.set('active', profile);
    this.record.updateTimestamp();
    this.record.save();
  }

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
  }

  @action
  updateProfileAction(profile) {
    this.updateProfile(profile);
  }
}
