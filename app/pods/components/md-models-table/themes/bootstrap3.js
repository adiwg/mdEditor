import Theme from "ember-models-table/themes/bootstrap3";
import classic from "ember-classic-decorator";
@classic
export default class Boostrap3 extends Theme {
  "sort-asc" = "fa fa-caret-up";
  "sort-desc" = "fa fa-caret-down";
  "column-visible" = "fa fa-check-square";
  "column-hidden" = "fa fa-square";
  "nav-first" = "fa fa-fast-backward";
  "nav-prev" = "fa fa-backward";
  "nav-next" = "fa fa-forward";
  "nav-last" = "fa fa-fast-forward";
  caret = "fa fa-caret-down";
  "select-row" = "fa fa-fw fa-check-square";
  "deselect-row" = "fa fa-fw fa-square-o";
  "select-all-rows" = "fa fa-fw fa-check-square";
  "deselect-all-rows" = "fa fa-fw fa-square";
  "expand-row" = "fa fa-plus";
  "expand-all-rows" = "fa fa-plus";
  "collapse-row" = "fa fa-minus";
  "collapse-all-rows" = "fa fa-minus";
  clearFilterIcon = "fa fa-times form-control-feedback";
  clearAllFiltersIcon = "fa fa-times";
  sortGroupedPropertyBtn = "btn";
  input = "form-control";
  inputGroup = "input-group";
  expandedRow = "expanded-row";
  expandRow = "expand-row md-collapsible-content";
  table = "table table-striped table-bordered table-condensed table-hover";
  selectRowOnExpandClick = false;
}
