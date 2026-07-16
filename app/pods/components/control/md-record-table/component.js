import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner, setOwner } from '@ember/application';
import { TrackedArray } from 'tracked-built-ins';
import Theme from 'mdeditor/pods/components/md-models-table/themes/bootstrap3';
import {
  buildRecordTableColumns,
  RECORD_TABLE_COLUMN_COMPONENTS,
} from './columns';
import * as tableRender from './table-render';

/**
 * Table used to display objects. Includes column to toggle selection for all
 * rows.
 *
 * Renders sort and data rows as inline markup in the template (not subcomponents)
 * because nested pod components fail to mount under ember-models-table 5.
 *
 * @class md-record-table
 */
export default class MdRecordTableComponent extends Component {
  @service router;

  get themeInstance() {
    if (!this._themeInstance) {
      const owner = getOwner(this);
      this._themeInstance = new Theme();
      setOwner(this._themeInstance, owner);
    }

    return this._themeInstance;
  }

  get tableData() {
    let data = this.args.records ?? this.args.data;

    if (!data) {
      return [];
    }

    return typeof data.toArray === 'function' ? data.toArray() : data;
  }

  get columns() {
    return buildRecordTableColumns(this.args);
  }

  get columnComponents() {
    return {
      ...RECORD_TABLE_COLUMN_COMPONENTS,
      ...this.args.columnComponents,
    };
  }

  get initialSelectedItems() {
    let prop = this.args.selectProperty;
    let data = this.tableData;

    if (!prop || !data.length) {
      this._initialSelectedItems = undefined;
      this._initialSelectedItemsKey = null;
      return undefined;
    }

    const cacheKey = `${prop}:${data.length}:${data[0]?.id ?? ''}`;

    if (
      this._initialSelectedItemsKey === cacheKey &&
      this._initialSelectedItems
    ) {
      return this._initialSelectedItems;
    }

    this._initialSelectedItemsKey = cacheKey;
    this._initialSelectedItems = new TrackedArray(
      data.filter((item) => get(item, prop))
    );

    return this._initialSelectedItems;
  }

  get filteringIgnoreCase() {
    return this.args.filteringIgnoreCase ?? true;
  }

  get multipleSelect() {
    return this.args.multipleSelect ?? true;
  }

  get showGlobalFilter() {
    return this.args.showGlobalFilter !== false;
  }

  get showColumnsDropdown() {
    return this.args.showColumnsDropdown !== false;
  }

  get showComponentFooter() {
    return this.args.showComponentFooter !== false;
  }

  get useFilteringByColumns() {
    return this.args.useFilteringByColumns !== false;
  }

  get showRouteName() {
    return this.args.showRouteName ?? 'record.show';
  }

  sortHeaderColumns(processedColumns) {
    return tableRender.sortHeaderColumns(processedColumns);
  }

  sortHeaderTitle(column) {
    return tableRender.sortHeaderTitle(column);
  }

  cellValue(record, column) {
    return tableRender.cellValue(record, column);
  }

  readButtonConfig(column) {
    return tableRender.readButtonConfig(column);
  }

  isRecordSelected(record, selectedItems) {
    return tableRender.isRecordSelected(record, selectedItems);
  }

  rowSelectedClass(record, selectedItems, themeInstance) {
    return tableRender.rowSelectedClass(record, selectedItems, themeInstance);
  }

  allRowsSelected(selectedItems, data) {
    return tableRender.allRowsSelected(selectedItems, data);
  }

  isCheckAllColumn(column) {
    return tableRender.isCheckAllColumn(column);
  }

  isCheckColumn(column) {
    return tableRender.isCheckColumn(column);
  }

  isCustomButtonColumn(column) {
    return tableRender.isCustomButtonColumn(column);
  }

  isButtonsColumn(column) {
    return tableRender.isButtonsColumn(column);
  }

  isButtonsShowColumn(column) {
    return tableRender.isButtonsShowColumn(column);
  }

  @action
  onDisplayDataChanged(settings) {
    let prop = this.args.selectProperty;
    let data = this.tableData;

    if (!prop || !data.length) {
      return;
    }

    data.forEach((item) => {
      const isSelected = settings.selectedItems?.includes(item);
      const currentValue = get(item, prop);

      if (currentValue !== isSelected) {
        set(item, prop, isSelected);
      }
    });
  }

  @action
  sortColumn(sortFn, column) {
    if (column?.useSorting) {
      sortFn?.(column);
    }

    return false;
  }

  @action
  toggleAllSelection(toggleFn) {
    toggleFn?.();
  }

  @action
  clickRow(clickOnRow, index, record) {
    if (this.args.selectRowOnClick !== false) {
      clickOnRow?.(index, record);
    }

    if (typeof this.args.onRecordClick === 'function') {
      this.args.onRecordClick(record);
    } else if (this.args.openRecordOnClick) {
      const modelName = record?.constructor?.modelName;

      if (modelName && record?.id) {
        this.router.transitionTo(`${modelName}.show`, record.id);
      }
    }

    return false;
  }

  @action
  toggleRowSelection(clickOnRow, index, record, event) {
    clickOnRow?.(index, record);
    event?.stopPropagation?.();
    return false;
  }

  @action
  runCustomButtonAction(config, record) {
    if (typeof config?.action === 'function') {
      config.action(record);
    }
  }

  select(rec, index, selected) {
    return selected;
  }
}
