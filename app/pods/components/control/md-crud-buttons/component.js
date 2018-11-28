/* eslint-disable ember/closure-actions */
import Component from '@ember/component';

export default Component.extend({
  classNames: 'md-crud-buttons',

  actions: {
    save: function () {
      this.sendAction('doSave');
    },

    cancel: function () {
      this.sendAction('doCancel');
    },

    delete: function () {
      this.sendAction('doDelete');
    },

    copy: function () {
      this.sendAction('doCopy');

    }
  }
});
