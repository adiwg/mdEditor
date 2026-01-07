import Component from '@ember/component';
import { computed } from '@ember/object';
import config from 'mdeditor/config/environment';

export default Component.extend({
  classNames: ['md-sidebar-wrapper'],
  classNameBindings: ['showHelp:help'],

  showHelp: false,

  prerelease: computed(function () {
    let version = this.version;

    if(version.substring(0, 3) === "0.0"){
      return 'alpha';
    }

    if(version.substring(0, 1) === "0" && version.substring(0, 3) >0){
      return 'beta';
    }
  }),

  version: computed(function () {
    let version = config.APP.version;

    return version.substring(0, version.indexOf('+'));
  }),
  actions: {
    toggleHelp() {
      this.toggleProperty('showHelp');
    },
    toggleSidebar() {
      const wrapper = document.getElementById('md-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('toggled');
      }

      //hack to force reflow
      const navList = document.querySelector('#md-navbar-main-collapse ul');
      if (navList) {
        navList.style.display = 'none';
        // Force reflow
        navList.offsetHeight;
        navList.style.display = '';
      }
    }
  }
});
