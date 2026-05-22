import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'mdeditor/config/environment';

@classic
export default class MdNavSidebarComponent extends Component {
  classNames = ['md-sidebar-wrapper'];
  classNameBindings = ['showHelp:help'];

  @tracked showHelp = false;

  init() {
    super.init(...arguments);
    if (this.version === undefined || this.version === null) {
      let v = config.APP.version || '';
      let idx = v.indexOf('+');
      this.set('version', idx === -1 ? v : v.substring(0, idx));
    }
  }

  @computed('version')
  get prerelease() {
    let version = this.version;
    if (!version) return;

    if (version.substring(0, 3) === '0.0') {
      return 'alpha';
    }

    if (version.substring(0, 1) === '0' && version.substring(0, 3) > 0) {
      return 'beta';
    }
  }

  @action
  toggleHelp(event) {
    event?.preventDefault?.();
    this.showHelp = !this.showHelp;
  }

  @action
  toggleSidebar(event) {
    event?.preventDefault?.();
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
