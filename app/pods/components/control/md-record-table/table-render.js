import { get } from '@ember/object';
import { isArray } from '@ember/array';
import { shownColumnsBody } from 'ember-models-table/utils/emt/shown-columns-body.function';
import {
  isCheckAllColumnDefinition,
  isCheckColumnDefinition,
  isCustomButtonColumnDefinition,
  isButtonsColumnDefinition,
  isButtonsShowColumnDefinition,
} from './column-detection';
import { RECORD_TABLE_COLUMN_COMPONENTS } from './column-components';

export function sortHeaderColumns(processedColumns) {
  return shownColumnsBody(processedColumns ?? [], 'colspanForSortCell');
}

export function sortHeaderTitle(column) {
  return (
    column?.title ?? column?.columnTitle ?? column?.originalDefinition?.title
  );
}

export function cellValue(record, column) {
  const propertyName =
    column?.propertyName || column?.originalDefinition?.propertyName;

  return record && propertyName ? get(record, propertyName) : null;
}

export function readButtonConfig(column) {
  return column?.buttonConfig ?? column?.originalDefinition?.buttonConfig;
}

export function isRecordSelected(record, selectedItems) {
  return isArray(selectedItems) && selectedItems.includes(record);
}

export function rowSelectedClass(record, selectedItems, themeInstance) {
  return isRecordSelected(record, selectedItems)
    ? themeInstance?.selectedRow ?? ''
    : '';
}

export function allRowsSelected(selectedItems, data) {
  return isArray(selectedItems) && isArray(data) && selectedItems.length === data.length;
}

export function isCheckAllColumn(column) {
  return isCheckAllColumnDefinition(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export function isCheckColumn(column) {
  return isCheckColumnDefinition(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export function isCustomButtonColumn(column) {
  return isCustomButtonColumnDefinition(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export function isButtonsColumn(column) {
  return isButtonsColumnDefinition(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export function isButtonsShowColumn(column) {
  return isButtonsShowColumnDefinition(column, RECORD_TABLE_COLUMN_COMPONENTS);
}
