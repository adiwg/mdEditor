import CheckComponent from 'mdeditor/pods/components/md-models-table/components/check/component';
import CheckAllComponent from 'mdeditor/pods/components/md-models-table/components/check-all/component';
import ButtonsComponent from 'mdeditor/pods/components/control/md-record-table/buttons/component';
import ButtonsShowComponent from 'mdeditor/pods/components/control/md-record-table/buttons/show/component';
import ButtonsFilterComponent from 'mdeditor/pods/components/control/md-record-table/buttons/filter/component';
import CustomButtonComponent from 'mdeditor/pods/components/control/md-record-table/buttons/custom/component';
import {
  readColumnComponentKey as readKey,
  readSortCellComponentKey as readSortKey,
} from './column-detection';

export const RECORD_TABLE_COLUMN_COMPONENTS = {
  'md-check': CheckComponent,
  'md-check-all': CheckAllComponent,
  'md-buttons': ButtonsComponent,
  'md-buttons-show': ButtonsShowComponent,
  'md-buttons-filter': ButtonsFilterComponent,
  'md-custom-button': CustomButtonComponent,
};

export function readColumnComponentKey(column) {
  return readKey(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export function readSortCellComponentKey(column) {
  return readSortKey(column, RECORD_TABLE_COLUMN_COMPONENTS);
}

export {
  isCheckColumnDefinition,
  isCustomButtonColumnDefinition,
  isButtonsColumnDefinition,
  isButtonsShowColumnDefinition,
  isCheckAllColumnDefinition,
} from './column-detection';
