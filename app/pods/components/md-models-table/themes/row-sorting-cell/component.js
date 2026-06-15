import Component from '@glimmer/component';
import { action } from '@ember/object';
import { splitPropSortDirection } from 'ember-models-table/utils/emt/split-prop-sort-direction.function';
import { isCheckAllColumnDefinition } from 'mdeditor/pods/components/control/md-record-table/column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from 'mdeditor/pods/components/control/md-record-table/column-components';

export default class MdRowSortingCellComponent extends Component {
  get isCheckAllColumn() {
    return isCheckAllColumnDefinition(
      this.args.column,
      RECORD_TABLE_COLUMN_COMPONENTS
    );
  }

  get columnTitle() {
    const column = this.args.column;

    return (
      column?.title ??
      column?.columnTitle ??
      column?.originalDefinition?.title
    );
  }

  get sortingIndex() {
    const sortField = this.args.column?.sortField;

    if (!sortField) {
      return -1;
    }

    return (
      (this.args.sortProperties ?? []).findIndex((sortProp) => {
        const propName = splitPropSortDirection(sortProp)[0];
        return propName === sortField;
      }) + 1
    );
  }

  @action
  onClick() {
    if (this.args.column?.useSorting) {
      this.args.sort?.(this.args.column);
    }

    return false;
  }

  @action
  toggleAllSelection() {
    if (this.args.toggleAllSelection) {
      this.args.toggleAllSelection();
    }
  }
}
