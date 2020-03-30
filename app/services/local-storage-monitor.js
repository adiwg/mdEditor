import Service, { inject as service } from '@ember/service';
import mdObjectSize from 'mdeditor/utils/md-object-size';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

/**
 * Local storage monitor service
 *
 * Service that provides a error messaging system if user is above,
 * local storage capacity.
 *
 * @module mdeditor
 * @submodule service
 * @class local-storage-monitor
 */
export default Service.extend({
  init() {
    this._super(...arguments);
    this.storageSize();
    this.storagePercent();
    this.showMessage();
  },

  flashMessages: service(),

  /**
   * Calculates size of current local storage.
   *
   * @method storageSize
   * @return {Number}
   */
  storageSize() {
    return mdObjectSize(window.localStorage);
  },

  /**
   * Sets percentage size of local storage against the "storagePercentTracked" property.
   *
   * @method storagePercent
   * @requires storageSize
   */
  storagePercent() {
    let p =  ((this.storageSize() / 5000) * 100).toFixed(2);
    set(this, "storagePercentTracked", p)
    return p
  },

  /**
   * Tracked property for changes in storagePercent
   *
   * @property storagePercentTracked
   * @type {Number}
   * @default 0
   */
  storagePercentTracked: tracked({
    value: 0
  }),

  /**
   * Show warning returns a flash message that will be displayed to user
   * if the user is over 80% of local storage capacity.
   *
   * @method showWarning
   * @returns {Object}
   * @requires flashMessages, storagePercentTracked
   */
  showWarning(msg) {
    return this.flashMessages.warning(msg || `Warning! Your local storage is at ${this.storagePercentTracked}% of your browser's local storage capacity. Please back up records and clear storage cache.`, {
      timeout: 15000,
      preventDuplicates: true
    })
  },

  /**
   * Show danger returns a flash message that will be displayed to user
   * if the user is over 90% of local storage capacity.
   *
   * @method showDanger
   * @returns {Object}
   * @requires flashMessages, storagePercentTracked
   */
  showDanger(msg) {
    return this.flashMessages.danger(msg || `Danger! Your local storage is at ${this.storagePercentTracked}% of your browser's local storage capacity. Please back up records and clear storage cache`,
      { sticky: true,
        preventDuplicates: true,
        destroyOnClick: true,
      })
  },

  /**
   * Show danger returns a flash message that will be displayed to user
   * if the user is over 90% of local storage capacity.
   *
   * @method show Message
   * @returns {Object}
   * @requires storagePercentTracked, showWarning(), showDanger()
   */
  showMessage() {
    if(this.storagePercentTracked >= 80 && this.storagePercentTracked < 90) {
      this.showWarning()
    } else if (this.storagePercentTracked >= 90) {
      this.showDanger()
    }
  }

});
