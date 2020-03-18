import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: service(),
  storageMonitor: service(),

  /**
   * Computed property that calculates the percent of local storage
   * against a 5000 kb capacity
   *
   * @property storagePercent
   * @type {Number}
   * @readonly
   * @category computed
   * @requires storageMonnitor
   */
  storagePercent: computed('storageMonitor', function () {
    return ((this.storageMonitor.calcStorage / 5000) * 100).toFixed(2)
  }),

  /**
   * Computed property that provides a boolean value based on local
   * storage percent. This will render a different color for tag in the
   * md-footer if the user is above the 90% threshold
   *
   * @property overPercent
   * @type {Boolean}
   * @readonly
   * @category computed
   * @requires storagePercent
   */
  overPercent: computed('storagePercent', function () {
    return this.storagePercent > 90
  })
});
