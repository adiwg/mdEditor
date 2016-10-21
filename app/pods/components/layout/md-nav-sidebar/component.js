import Ember from 'ember';
import config from 'mdeditor/config/environment';

export default Ember.Component.extend({
  classNameBindings: ['isAlpha', 'isBeta'],
  isAlpha: Ember.computed(function () {
    return this.get('version')
      .substring(0, 3) === "0.0";
  }),

  isBeta: Ember.computed(function () {
    let version = this.get('version');
    return version.substring(0, 1) === "0" && version.substring(0, 3) >
      0;
  }),

  version: Ember.computed(function () {
    let version = config.APP.version;

    return version.substring(0, version.indexOf('+'));
  }),
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
