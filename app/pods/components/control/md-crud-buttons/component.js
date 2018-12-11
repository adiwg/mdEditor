/* eslint-disable ember/closure-actions */
import Component from '@ember/component';

export default Component.extend({
  classNames: 'md-crud-buttons',

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

    }
  }
});
