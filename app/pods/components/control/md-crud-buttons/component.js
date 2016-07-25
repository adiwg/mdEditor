import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @property model
   * @type DS.model
   * @required
   */

  /**
   * Callback passed to save action.
   *
   * @property didSave
   * @type action
   */

  /**
   * Callback passed to cancel action.
   *
   * @property didCancel
   * @type action
   */

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
