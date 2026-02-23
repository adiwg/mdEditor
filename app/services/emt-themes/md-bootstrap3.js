import Bootstrap3Theme from 'ember-models-table/services/emt-themes/bootstrap3';
import { ensureSafeComponent } from '@embroider/util';
import CellContentDisplay from 'mdeditor/pods/components/models-table/cell-content-display/component';
import RowExpand from 'mdeditor/pods/components/models-table/row-expand/component';
import TableBody from 'mdeditor/pods/components/models-table/table-body/component';

export default class MdBootstrap3Theme extends Bootstrap3Theme {
  // Icon overrides (Font Awesome instead of Glyphicons)
  sortAscIcon = 'fa fa-caret-up';
  sortDescIcon = 'fa fa-caret-down';
  columnVisibleIcon = 'fa fa-check-square-o';
  columnHiddenIcon = 'fa fa-square-o';
  navFirstIcon = 'fa fa-fast-backward';
  navPrevIcon = 'fa fa-backward';
  navNextIcon = 'fa fa-forward';
  navLastIcon = 'fa fa-fast-forward';
  caretIcon = 'fa fa-caret-down';
  selectRowIcon = 'fa fa-fw fa-check-square-o';
  deselectRowIcon = 'fa fa-fw fa-square-o';
  selectAllRowsIcon = 'fa fa-fw fa-check-square-o';
  deselectAllRowsIcon = 'fa fa-fw fa-square-o';
  expandRowIcon = 'fa fa-plus';
  expandAllRowsIcon = 'fa fa-plus';
  collapseRowIcon = 'fa fa-minus';
  collapseAllRowsIcon = 'fa fa-minus';
  clearFilterIcon = 'fa fa-times form-control-feedback';
  clearAllFiltersIcon = 'fa fa-times';
  sortGroupedPropertyBtn = 'btn';
  input = 'form-control';
  expandedRow = 'expanded-row';
  expandRow = 'expand-row md-collapsible-content';
  table = 'table table-striped table-bordered table-condensed table-hover';
  selectRowOnExpandClick = false;

  // Override sub-component getters for custom components
  get cellContentDisplayComponent() {
    return ensureSafeComponent(CellContentDisplay, this);
  }

  get rowExpandComponent() {
    return ensureSafeComponent(RowExpand, this);
  }

  get tableBodyComponent() {
    return ensureSafeComponent(TableBody, this);
  }
}
