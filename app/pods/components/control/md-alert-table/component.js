import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class MdAlertTableComponent extends Component {
  classNames = ['alert', 'md-alert-table'];
  classNameBindings = ['alertType'];
  required = false;
  title = '';
  target = null;

  get alertType() {
    return 'alert-' + (this.required ? 'danger' : 'info');
  }

  get tipType() {
    return this.required ? 'danger' : 'info';
  }

  get tipIcon() {
    return this.required ? 'exclamation-circle' : 'info-circle';
  }

  actions = {
    addItem(target) {
      if (this.onAddItem) {
        this.onAddItem(target);
      }
    }
  }
}
