import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function () {
    this.$('[data-toggle="tooltip"]')
      .tooltip();
  },
  actions: {
    toggleSidebar() {
      $('#md-wrapper')
        .toggleClass('toggled');
      //hack to force reflow
      $('#md-navbar-main-collapse ul')
        .hide()
        .show(0);
    }
  }
});
