import MdRecordTableComponent from 'mdeditor/pods/components/control/md-record-table/component';
import { buildRecordTableColumns } from 'mdeditor/pods/components/control/md-record-table/columns';
import RowButtonsComponent from 'mdeditor/pods/components/md-models-table/components/row-buttons/component';
import ButtonsFilterComponent from 'mdeditor/pods/components/control/md-record-table/buttons/filter/component';
import { action } from '@ember/object';

export default class MdEditTableComponent extends MdRecordTableComponent {
  spotlightRow = true;

  get columns() {
    return buildRecordTableColumns({
      ...this.args,
      actionsColumn: this.actionsColumn,
    });
  }

  get actionsColumn() {
    let btns = [
      {
        title: 'Edit',
        type: 'success',
        icon: 'pencil',
        action: 'handleEditRow',
        target: this,
      },
      {
        title: 'Delete',
        type: 'danger',
        icon: 'times',
        confirm: true,
        action: 'handleDeleteRow',
        target: this,
      },
    ];

    if (this.args.actionButtons) {
      btns.push(this.args.actionButtons);
    }

    return {
      className: 'md-actions-column',
      propertyName: 'id',
      component: RowButtonsComponent,
      componentForFilterCell: ButtonsFilterComponent,
      disableFiltering: true,
      disableSorting: true,
      mayBeHidden: false,
      buttons: btns,
      badges: this.args.actionBadges,
    };
  }

  editRowMethod(index, record) {
    this.expandRow(index, record);
  }

  @action
  handleEditRow(col, index, record, evt) {
    if (evt) {
      evt.stopPropagation();
    }

    if (typeof this.args.editRow === 'function') {
      this.args.editRow(col, index, record, evt);
    } else {
      this.editRowMethod(index, record);
    }
  }

  @action
  handleDeleteRow(col, index, record) {
    record.destroyRecord();
  }
}
