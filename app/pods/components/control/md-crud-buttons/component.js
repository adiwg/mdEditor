/* eslint-disable ember/closure-actions */
import Component from '@ember/component';

export default Component.extend({
  classNames: 'md-crud-buttons',

  actions: {
    save: function () {
      this.get('doSave')();
    },

    cancel: function () {
      this.get('doCancel')();
    },

    delete: function () {
      this.get('doDelete')();
    },

    copy: function () {
      this.get('doCopy')();

    }
  }
});
