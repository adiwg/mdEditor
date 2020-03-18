import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import mdCalcStorage from 'mdeditor/utils/md-calc-storage';

export default Service.extend({
  init() {
    this._super(...arguments);

    this.storageMessages();
  },

  flashMessages: service(),

  /**
   * The current local storage object.
   *
   * @property currStorage
   * @type {Object}
   * @readOnly
   * @category computed
   */
  currStorage: window.localStorage,

  /**
   * Calculates current local storage using mdCalcStorage utlity.
   *
   * @property calcStorage
   * @type {Number}
   * @readOnly
   * @category computed
   * @requires currStorage
   */
  calcStorage: computed('currStorage', function () {
    return mdCalcStorage(this.currStorage)
  }),

  storageMessages() {
    let storagePercent = ((this.calcStorage / 5000) * 100).toFixed(2)
    let flashMessages = this.flashMessages;

    if(storagePercent >= 80 && storagePercent < 90) {
      return flashMessages.warning(`Warning! Your local storage is at ${storagePercent}% of your browser's local storage capacity. Please back up records and clear storage cache`, {timeout: 15000, preventDuplicates: true})
    } else if (storagePercent >= 2) {
      return flashMessages.danger(`Danger! Your local storage is at ${storagePercent}% of your browser's local storage capacity. Please back up records and clear storage cache`,
      { sticky: true,
        preventDuplicates: true,
        destroyOnClick: true,
        onDestroy() {
          window.location.reload()
        }
      })
    }
  }

});
