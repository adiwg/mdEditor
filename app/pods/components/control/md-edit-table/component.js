import MdRecordTableComponent from 'mdeditor/pods/components/control/md-record-table/component';
//import Component from '@ember/component';
import { action } from '@ember/object';

export default class MdEditTableComponent extends MdRecordTableComponent {
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Table used to edit objects with row expander. Includes column to toggle
   * selection for all rows. Component supplied in `editRowComponent` is rendered
   * when the row is expanded.
   *
   *```handlebars
   * \{{control/md-record-table
   *   data=model.data
   *   columns=model.columns
   *   select=callback
   * }}
   * ```
   *
   * @class md-edit-table
   * @extends md-record-table
   */

  classNames = ['md-edit-table'];
  spotlightRow = true;

  /**
  * Array of button configs to add to action column
  *
  * @property actionButtons
  * @type {[Object]}
  */

  /**
  * Array of badge configs to add to action column
  *
  * @property actionBadges
  * @type {[Object]}
  */

  /**
   * Column configs for the action column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property actionsColumn
   * @type {Object}
   * @required
   */
  get actionsColumn() {
    let btns = [{
      title: 'Edit',
      type: 'success',
      icon: 'pencil',
      action: "handleEditRow",
      target: this
    }, {
      title: 'Delete',
      type: 'danger',
      icon: 'times',
      confirm: true,
      action: "handleDeleteRow",
      target: this
    }]

    if(this.actionButtons) {
      btns.push(this.actionButtons);
    }

    return {
      className: 'md-actions-column',
      component: 'components/md-models-table/components/row-buttons',
      componentForFilterCell: 'control/md-record-table/buttons/filter',
      disableFiltering: true,
      disableSorting: true,
      mayBeHidden: false,
      buttons: btns,
      badges: this.actionBadges
    };
  }

  editRowMethod(index, record){
    this.send('expandRow',index, record);
  }

  @action
  handleEditRow(col, index, record, evt){
    evt.stopPropagation();
    if (typeof this.editRow === 'function') {
      this.editRow(col, index, record, evt);
    } else {
      this.editRowMethod(index, record);
    }
  }

  @action
  handleDeleteRow(col, index, record){
    record.destroyRecord();
  }
}
