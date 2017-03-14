import Ember from 'ember';

export default Ember.Component.extend({
  /*didInsertElement: function () {
    this.$('[data-toggle="tooltip"]')
      .tooltip();
  },*/
  actions: {
    toggleSidebar() {
      Ember.$('#md-wrapper')
        .toggleClass('toggled');
      //hack to force reflow
      Ember.$('#md-navbar-main-collapse ul')
        .hide()
        .show(0);
    }
  }
});
