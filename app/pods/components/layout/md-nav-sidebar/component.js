import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    toggleHelp() {
        const sw = Ember.$('#md-sidebar-wrapper');

        Ember.$('#md-help')
          .fadeToggle();
        sw.toggleClass('help');
      },
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
