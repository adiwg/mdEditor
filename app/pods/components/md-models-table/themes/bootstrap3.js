import Theme from 'ember-models-table/themes/bootstrap3';

export default Theme.extend({
  'sort-asc': 'fa fa-caret-up',
  'sort-desc': 'fa fa-caret-down',
  'column-visible': 'fa fa-check-square-o',
  'column-hidden': 'fa fa-square-o',
  'nav-first': 'fa fa-fast-backward',
  'nav-prev': 'fa fa-backward',
  'nav-next': 'fa fa-forward',
  'nav-last': 'fa fa-fast-forward',
  'caret': 'fa fa-caret-down',
  'select-row': 'fa fa-fw fa-check-square-o',
  'deselect-row': 'fa fa-fw fa-square-o',
  'select-all-rows': 'fa fa-fw fa-check-square-o',
  'deselect-all-rows': 'fa fa-fw fa-square-o',

  table: 'table table-striped table-bordered table-condensed table-hover'
});
