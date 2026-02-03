import Theme from 'ember-models-table/themes/bootstrap3';
import classic from 'ember-classic-decorator';

@classic
export default class MdBootstrap3Theme extends Theme {
  // Override componentsPath to use our custom components at models-table/
  componentsPath = 'models-table/';

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
}
