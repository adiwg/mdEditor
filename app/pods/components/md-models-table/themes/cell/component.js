import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import {
  readColumnComponentKey,
  isCustomButtonColumnDefinition,
} from 'mdeditor/pods/components/control/md-record-table/column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from 'mdeditor/pods/components/control/md-record-table/column-components';

export default class MdCellComponent extends Component {
  get columnKey() {
    return readColumnComponentKey(this.args.column, RECORD_TABLE_COLUMN_COMPONENTS);
  }

  get isCheckColumn() {
    return this.columnKey === 'md-check';
  }

  get isCustomButtonColumn() {
    return isCustomButtonColumnDefinition(
      this.args.column,
      RECORD_TABLE_COLUMN_COMPONENTS
    );
  }

  get isButtonsColumn() {
    return this.columnKey === 'md-buttons';
  }

  get isButtonsShowColumn() {
    return this.columnKey === 'md-buttons-show';
  }

  get propertyName() {
    const column = this.args.column;

    return (
      column?.propertyName ||
      column?.originalDefinition?.propertyName ||
      column?.sortedBy ||
      column?.originalDefinition?.sortedBy
    );
  }

  get cellValue() {
    const record = this.args.record;
    const path = this.propertyName;

    if (!record || !path) {
      return null;
    }

    return get(record, path);
  }

  get buttonConfig() {
    const column = this.args.column;

    return column?.buttonConfig ?? column?.originalDefinition?.buttonConfig;
  }

  get showRouteName() {
    const record = this.args.record;

    if (!record) {
      return null;
    }

    return get(record, 'routeName') ?? record.routeName;
  }

  @action
  onClick(event) {
    if (this.args.isEditRow) {
      event?.stopPropagation?.();
    }
  }

  @action
  toggleRowSelection(event) {
    if (this.args.clickOnRow) {
      this.args.clickOnRow(this.args.index, this.args.record);
    }

    event?.stopPropagation?.();
    return false;
  }

  @action
  runCustomButtonAction() {
    const action = this.buttonConfig?.action;

    if (typeof action === 'function') {
      action(this.args.record);
    }
  }
}
