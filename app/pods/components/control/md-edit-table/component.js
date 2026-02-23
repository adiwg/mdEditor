import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { A } from '@ember/array';

@classic
export default class MdEditTableComponent extends Component {
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Table used to edit objects with row expander. Includes column to toggle
   * selection for all rows. Component supplied in `editRowComponent` is rendered
   * when the row is expanded.
   *
   * @class md-edit-table
   * @extends Component
   */

  classNames = ['md-edit-table'];
  spotlightRow = true;

  init() {
    super.init(...arguments);
    this._expandedItems = A(this.expandedItems || []);
  }

  /**
   * Column configs for the action column.
   *
   * @property actionsColumn
   * @type {Object}
   */
  get actionsColumn() {
    let btns = [{
      title: 'Edit',
      type: 'success',
      icon: 'pencil',
      action: "handleEditRow",
      target: this
    }, {
      title: 'Delete',
      type: 'danger',
      icon: 'times',
      confirm: true,
      action: "handleDeleteRow",
      target: this
    }];

    if (this.actionButtons) {
      btns.push(this.actionButtons);
    }

    return {
      className: 'md-actions-column',
      component: 'row-buttons',
      componentForFilterCell: 'control/md-record-table/buttons/filter',
      disableFiltering: true,
      disableSorting: true,
      mayBeHidden: false,
      buttons: btns,
      badges: this.actionBadges
    };
  }

  @action
  expandRecord(index, record) {
    let expanded = this._expandedItems;
    let idx = expanded.indexOf(record);
    if (idx === -1) {
      expanded.pushObject(record);
    } else {
      expanded.removeObject(record);
    }
    this.notifyPropertyChange('_expandedItems');
  }

  editRowMethod(index, record) {
    this.expandRecord(index, record);
  }

  @action
  handleEditRow(col, index, record, evt) {
    evt.stopPropagation();
    if (typeof this.editRow === 'function') {
      this.editRow(col, index, record, evt);
    } else {
      this.editRowMethod(index, record);
    }
  }

  @action
  handleDeleteRow(col, index, record) {
    record.destroyRecord();
  }
}
