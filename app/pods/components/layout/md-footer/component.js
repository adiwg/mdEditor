import Component from '@ember/component';
import { inject as service }  from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: service(),
  localStorageMonitor: service(),
  /**
   * Computed property that provides storage percentage to template via
   * local storage monitor service
   * @property percent
   * @type {Number}
   * @readonly
   * @category computed
   * @requires localStorageMonitor
   */
  percent: computed(function () {
    return this.localStorageMonitor.storagePercentTracked
  }),
  /**
   * Computed property that provides a boolean value based on local
   * storage percent. This will render a different color for the
   * tag in the md-footer if the user is above the 90% threshold
   *
   * @property isOverThreshold
   * @type {Boolean}
   * @readonly
   * @category computed
   * @requires percent
   */
  isOverThreshold: computed('percent', function () {
    return this.percent > 90
  })
});
