import Component from '@glimmer/component';
import { action } from '@ember/object';
import { shownColumnsBody } from 'ember-models-table/utils/emt/shown-columns-body.function';
import { isCheckAllColumnDefinition } from '../column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from '../column-components';

export default class SortHeaderRowComponent extends Component {
  get headerCells() {
    const columns = shownColumnsBody(
      this.args.processedColumns ?? [],
      'colspanForSortCell'
    );

    return columns.map((column) => ({
      column,
      isCheckAll: isCheckAllColumnDefinition(
        column,
        RECORD_TABLE_COLUMN_COMPONENTS
      ),
      title:
        column?.title ??
        column?.columnTitle ??
        column?.originalDefinition?.title,
    }));
  }

  @action
  sortColumn(column) {
    if (column?.useSorting) {
      this.args.sort?.(column);
    }

    return false;
  }

  @action
  toggleAllSelection() {
    this.args.toggleAllSelection?.();
  }
}
