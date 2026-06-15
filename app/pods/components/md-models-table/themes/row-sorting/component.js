import Component from '@glimmer/component';
import { action } from '@ember/object';
import { splitPropSortDirection } from 'ember-models-table/utils/emt/split-prop-sort-direction.function';
import { shownColumnsBody } from 'ember-models-table/utils/emt/shown-columns-body.function';
import { isCheckAllColumnDefinition } from 'mdeditor/pods/components/control/md-record-table/column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from 'mdeditor/pods/components/control/md-record-table/column-components';

export default class MdRowSortingComponent extends Component {
  get shouldAddExtraColumn() {
    return (
      this.args.displayGroupedValueAs === 'column' &&
      this.args.useDataGrouping &&
      !!this.args.visibleProcessedColumns?.length
    );
  }

  get headerCells() {
    const columns = shownColumnsBody(
      this.args.processedColumns,
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
