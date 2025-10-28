import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
/* global $ */
import Component from '@ember/component';

@classic
export default class MdNavMain extends Component {
  @action
  toggleSidebar() {
    $('#md-wrapper').toggleClass('toggled');
    //hack to force reflow
    $('#md-navbar-main-collapse ul').hide().show(0);
  }
}
