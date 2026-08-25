import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';

@classic
export default class RowButtonsComponent extends Component {
  classNames = ['md-row-buttons'];

  @action
  executeAction(btn, column, index, record, event) {
    if (btn.toggleExpand) {
      if (this.isExpanded) {
        this.collapseRow(index, record);
      } else {
        this.expandRow(index, record);
      }
    }

    if (btn.target) {
      if (typeof btn.action === 'function') {
        btn.action.call(btn.target, column, index, record, event);
      } else if (typeof btn.target[btn.action] === 'function') {
        btn.target[btn.action](column, index, record, event);
      } else if (typeof btn.target.send === 'function') {
        btn.target.send(btn.action, column, index, record, event);
      }
    } else if (typeof btn.action === 'function') {
      btn.action(column, index, record, event);
    }
  }
}
