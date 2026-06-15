import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { isArray } from '@ember/array';
import {
  readColumnComponentKey,
  isCustomButtonColumnDefinition,
} from 'mdeditor/pods/components/control/md-record-table/column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from 'mdeditor/pods/components/control/md-record-table/column-components';

export default class MdRowComponent extends Component {
  get rowSelectedClass() {
    return this.isSelected ? this.args.themeInstance.selectedRow : '';
  }

  get rowExpandedClass() {
    return this.isExpanded ? this.args.themeInstance.expandedRow : '';
  }

  get isSelected() {
    return (
      isArray(this.args.selectedItems) &&
      this.args.selectedItems.includes(this.args.record)
    );
  }

  get isExpanded() {
    return (
      isArray(this.args.expandedItems) &&
      this.args.expandedItems.includes(this.args.record)
    );
  }

  get cells() {
    const record = this.args.record;
    const columns = this.args.visibleProcessedColumns ?? [];

    return columns.map((column, index) => {
      const key = readColumnComponentKey(column, RECORD_TABLE_COLUMN_COMPONENTS);
      const propertyName =
        column?.propertyName || column?.originalDefinition?.propertyName;

      return {
        column,
        index,
        key,
        isCheck: key === 'md-check',
        isCustomButton: isCustomButtonColumnDefinition(
          column,
          RECORD_TABLE_COLUMN_COMPONENTS
        ),
        value:
          record && propertyName ? get(record, propertyName) : null,
        buttonConfig:
          column?.buttonConfig ?? column?.originalDefinition?.buttonConfig,
      };
    });
  }

  @action
  onClick() {
    this.args.clickOnRow?.(this.args.index, this.args.record);
    return false;
  }

  @action
  onDoubleClick() {
    this.args.doubleClickOnRow?.(this.args.index, this.args.record);
  }

  @action
  onEnter() {
    this.args.hoverOnRow?.(this.args.index, this.args.record);
  }

  @action
  onLeave() {
    this.args.outRow?.(this.args.index, this.args.record);
  }

  @action
  toggleRowSelection(colIndex, event) {
    if (this.args.clickOnRow) {
      this.args.clickOnRow(colIndex, this.args.record);
    }

    event?.stopPropagation?.();
    return false;
  }

  @action
  runCustomButtonAction(config) {
    if (typeof config?.action === 'function') {
      config.action(this.args.record);
    }
  }
}
