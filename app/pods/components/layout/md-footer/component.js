import Component from '@ember/component';
import { storageSize } from 'mdeditor/utils/md-object-size';
import { inject as service }  from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: service(),
  localStoragePercent: tracked({
    value: storageSize().percent
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
   * @requires localStorageMonitor
   */
  isOverThreshold: computed('localStoragePercent', function () {
    return this.localStoragePercent > 90
  })
});
