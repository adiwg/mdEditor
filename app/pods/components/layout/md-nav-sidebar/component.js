import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    toggleHelp() {
        const sw = $('#md-sidebar-wrapper');

        $('#md-help')
          .fadeToggle();
        sw.toggleClass('help');
      },
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
