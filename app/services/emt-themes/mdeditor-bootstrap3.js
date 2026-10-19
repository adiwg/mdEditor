import Bootstrap3Theme from 'ember-models-table/services/emt-themes/bootstrap3';

/**
 * ember-models-table@5 moved theming from a manually-created class instance
 * to an injectable service. This overrides the addon's own bootstrap3 theme
 * (which uses Bootstrap glyphicons) with the Font Awesome icon set and CSS
 * classes this app has always used.
 */
export default class MdeditorBootstrap3Theme extends Bootstrap3Theme {
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
  selectSomeRowsIcon = 'fa fa-fw fa-minus-square-o';
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
}
