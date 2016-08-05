import Ember from 'ember';

export default Ember.Component.extend({
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
