import Component from '@glimmer/component';
import { action, get, set } from '@ember/object';
import FilterButton from 'mdeditor/pods/components/control/md-record-table/buttons/filter/component';
import RowSelectCheckbox from 'ember-models-table/components/models-table/themes/default/row-select-checkbox';
import RowSelectAllCheckbox from 'ember-models-table/components/models-table/themes/default/row-select-all-checkbox';

/**
 * @module mdeditor
 * @submodule components-control
 */

/**
 * Table used to display objects. Includes column to toggle selection for all
 * rows.
 *
 * ```handlebars
 * <Control::MdRecordTable
 *   @data={{this.model.data}}
 *   @dataColumns={{this.model.columns}}
 * />
 * ```
 *
 * @class md-record-table
 */
export default class MdRecordTableComponent extends Component {
  get selectProperty() {
    return this.args.selectProperty ?? '_selected';
  }

  /**
   * Seed selectedItems from the selectProperty flag on each data item.
   */
  get initialSelectedItems() {
    const prop = this.selectProperty;
    const data = this.args.data;

    if (!prop || !data) {
      return [];
    }

    return data.filter((item) => get(item, prop));
  }

  get checkColumn() {
    return {
      component: RowSelectCheckbox,
      disableFiltering: true,
      mayBeHidden: false,
      componentForSortCell: RowSelectAllCheckbox,
      className: 'text-center',
    };
  }

  get actionsColumn() {
    if (this.args.actionsColumn !== undefined) {
      return this.args.actionsColumn;
    }

    if (this.args.hideActionsColumn) {
      return null;
    }

    const all = this.args.allActions;

    return {
      title: 'Actions',
      className: 'md-actions-column',
      component: all
        ? 'control/md-record-table/buttons'
        : 'control/md-record-table/buttons/show',
      disableFiltering: !all,
      componentForFilterCell: all ? FilterButton : null,
      showSlider: this.args.showSlider,
    };
  }

  get columns() {
    const cols = [this.checkColumn, ...(this.args.dataColumns ?? [])];
    const actions = this.actionsColumn;

    if (actions) {
      cols.push(actions);
    }

    return cols;
  }

  /**
   * Keep each row's selectProperty flag (e.g. `_selected`, used by the
   * Export page to know which records to export) in sync with the table's
   * live selection.
   */
  @action
  handleDisplayDataChanged(displaySettings) {
    const prop = this.selectProperty;
    const data = this.args.data;

    if (!prop || !data) {
      return;
    }

    const selected = displaySettings.selectedItems;

    data.forEach((item) => {
      const isSelected = selected.includes(item);
      if (get(item, prop) !== isSelected) {
        set(item, prop, isSelected);
      }
    });
  }
}
