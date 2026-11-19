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

  // addItem is passed in as an action from parent component

  get alertType() {
    return 'alert-' + (this.required ? 'danger' : 'info');
  }

  get tipType() {
    return this.required ? 'danger' : 'info';
  }

  get tipIcon() {
    return this.required ? 'exclamation-circle' : 'info-circle';
  }

  @action
  doAddItem(target) {
    if (this.addItem) {
      this.addItem(target);
    }
  }
}
