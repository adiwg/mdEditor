import Component from '@glimmer/component';
import { action } from '@ember/object';
import RowButtonsComponent from 'mdeditor/pods/components/md-models-table/components/row-buttons/component';
import FilterComponent from 'mdeditor/pods/components/control/md-record-table/buttons/filter/component';

/**
 * Table used to edit objects with row expander. Includes column to toggle
 * selection for all rows. Component supplied in `editRowComponent` is rendered
 * when the row is expanded.
 *
 * ```handlebars
 * <Control::MdEditTable
 *   @data={{this.model.data}}
 *   @dataColumns={{this.model.columns}}
 *   @editRow={{this.editRow}}
 * />
 * ```
 *
 * @class md-edit-table
 */
export default class MdEditTableComponent extends Component {
  /**
   * Column config for the action column. See
   * http://onechiporenko.github.io/ember-models-table
   */
  get actionsColumn() {
    const btns = [
      {
        title: 'Edit',
        type: 'success',
        icon: 'pencil',
        action: 'handleEditRow',
        target: this,
        toggleExpand: true,
      },
      {
        title: 'Delete',
        type: 'danger',
        icon: 'times',
        confirm: true,
        action: 'handleDeleteRow',
        target: this,
      },
    ];

    if (this.args.actionButtons) {
      btns.push(this.args.actionButtons);
    }

    return {
      className: 'md-actions-column',
      component: RowButtonsComponent,
      componentForFilterCell: FilterComponent,
      disableFiltering: true,
      disableSorting: true,
      mayBeHidden: false,
      buttons: btns,
      badges: this.args.actionBadges,
    };
  }

  @action
  handleEditRow(col, index, record, evt) {
    if (evt) {
      evt.stopPropagation();
    }
    if (typeof this.args.editRow === 'function') {
      this.args.editRow(col, index, record, evt);
    }
  }

  @action
  handleDeleteRow(col, index, record) {
    record.destroyRecord();
  }
}
