import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: service(),
  storageMonitor: service(),

  /**
   * Calculates storageMonitor's kb value into a percentage
   *
   * @property storagePercent
   * @type {Number}
   * @readOnly
   * @category computed
   * @requires storageMonitor
   */
  storagePercent: computed('storageMonitor', function () {
    return ((this.storageMonitor.calcStorage / 5000) * 100).toFixed(2)
  }),

  /**
   * Returns a boolean value if the storage monitor percent value is above
   * 90%
   *
   * @property overPercent
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires storagePercent
   */
  overPercent: computed('storagePercent', function () {
    return this.storagePercent > 90 ? true : false
  })
});
