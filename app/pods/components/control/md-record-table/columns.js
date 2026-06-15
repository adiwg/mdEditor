import { A } from '@ember/array';
import { RECORD_TABLE_COLUMN_COMPONENTS } from './column-components';

export { RECORD_TABLE_COLUMN_COMPONENTS };

const CHECK_COLUMN = {
  component: 'md-check',
  disableFiltering: true,
  disableSorting: true,
  mayBeHidden: false,
  componentForSortCell: 'md-check-all',
  className: 'text-center',
};

function buildActionsColumn(args = {}) {
  if (args.actionsColumn) {
    return args.actionsColumn;
  }

  if (args.hideActionsColumn) {
    return null;
  }

  const all = args.allActions;

  return {
    title: 'Actions',
    className: 'md-actions-column',
    propertyName: 'id',
    component: all ? 'md-buttons' : 'md-buttons-show',
    disableFiltering: !all,
    componentForFilterCell: all ? 'md-buttons-filter' : null,
    showSlider: args.showSlider,
  };
}

export function buildRecordTableColumns(args = {}) {
  const dataColumns = args.dataColumns ?? args.columns ?? [];
  let cols = A().concat(dataColumns);
  cols = [{ ...CHECK_COLUMN }].concat(cols);

  const action = buildActionsColumn(args);
  if (action) {
    cols.push(action);
  }

  return cols;
}
