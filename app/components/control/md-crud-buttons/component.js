/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: 'md-crud-buttons',
  settings: service(),

  /**
   * Indicates whether to display the "Delete" button. If not defined, defaults
   * to "settings.data.showDelete".
   *
   * @property allowDelete
   * @type {Boolean}
   * @default "settings.showDelete"
   */

  /**
   * Indicates whether to display the "Copy" button. If not defined, defaults to
   * "settings.data.showDelete".
   *
   * @property allowCopy
   * @type {Boolean}
   * @default "settings.showDelete"
   */

  showDelete: computed('settings.showDelete', 'allowDelete', function () {
    return isEmpty(this.allowDelete)
      ? this.settings.data.showDelete
      : this.allowDelete;
  }),

  showCopy: computed('settings.showDelete', 'allowCopy', function () {
    return isEmpty(this.allowCopy)
      ? this.settings.data.showCopy
      : this.allowCopy;
  }),

  actions: {
    save: function () {
      this.doSave();
    },

    cancel: function () {
      this.doCancel();
    },

    delete: function () {
      this.doDelete();
    },

    copy: function () {
      this.doCopy();
    },
  },
});
