import Component from '@ember/component';
import { inject as service }  from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: service(),
  localStorageMonitor: service(),
  /**
   * Computed property that provides a boolean value based on local
   * storage percent. This will render a different color for the
   * tag in the md-footer if the user is above the 90% threshold
   *
   * @property isOverThreshold
   * @type {Boolean}
   * @readonly
   * @category computed
   * @requires localStorageMonitor
   */
  isOverThreshold: computed('localStorageMonitor', function () {
    return this.localStorageMonitor.storagePercentTracked > 90
  })
});
