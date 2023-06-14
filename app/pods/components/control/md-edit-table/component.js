import Component from 'mdeditor/pods/components/control/md-record-table/component';
//import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
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

  // classNames: ['md-edit-table'],
  tagName: '',
  spotlightRow: true,

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
  actionsColumn: computed('actionButtons', function () {
    let btns = [
      {
        title: 'Edit',
        type: 'success',
        icon: 'pencil',
        // action: this.actions.editRow,
        action: 'editRow',
        target: this,
      },
      {
        title: 'Delete',
        type: 'danger',
        icon: 'times',
        confirm: true,
        //action: this.actions.deleteRow,
        action: 'deleteRow',
        target: this,
      },
    ];

    if (this.actionButtons) {
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
      badges: this.actionBadges,
    };
  }),

  editRow(index, record) {
    this.send('expandRow', index, record);
  },

  actions: {
    // body
    editRow(col, index, record, evt) {
      evt.stopPropagation();
      this.editRow(index, record);
    },
    deleteRow(col, index, record) {
      record.destroyRecord();
    },
  },
});
