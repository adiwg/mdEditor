import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
export default class MdNavMainComponent extends Component {
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
      navList.offsetHeight;
      navList.style.display = '';
    }
  }
}
