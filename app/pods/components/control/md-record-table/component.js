import { computed, get, defineProperty, observer } from '@ember/object';
import { run } from '@ember/runloop';
import Table from 'mdeditor/pods/components/md-models-table/component';
import { warn } from '@ember/debug';
import { isArray, A } from '@ember/array';

export default Table.extend({
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Table used to display objects. Includes column to toggle selection for all
   * rows.
   *
   *```handlebars
   * \{{control/md-record-table
   *   data=model.data
   *   columns=model.columns
   *   select=callback
   * }}
   * ```
   *
   * @class md-select-table
   * @extends models-table
   */
  init() {
    this.dataColumns = this.dataColumns || [];
    this.filteringIgnoreCase = this.filteringIgnoreCase || true;
    this.multipleSelect = this.multipleSelect || true;

    defineProperty(
      this,
      'columns',
      computed('dataColumns', 'checkColumn', function () {
        let chk = this.checkColumn;
        let action = this.actionsColumn;
        let cols = A().concat(this.dataColumns);

        if (chk) {
          cols = [chk].concat(cols);
        }

        if (action) {
          cols.push(action);
        }

        return cols;
      })
    );

    this._super(...arguments);
  },
  classNames: ['md-record-table'],

  /**
   * Observer to sync parent's selectedItems array with our selectProperty
   */
  syncSelectedItemsObserver: observer('selectedItems.[]', function () {
    // Whenever selectedItems changes, sync the selectProperty on all records
    run.next(() => {
      let prop = this.selectProperty;
      let data = this.data;

      // Get parent's actual selectedItems (not our override)
      let parentSelectedItems = this.get('selectedItems');

      if (!prop || !data) {
        return;
      }

      // Sync all records so their selectProperty matches being in parent's selectedItems
      data.forEach((item) => {
        const isSelected =
          parentSelectedItems && parentSelectedItems.includes(item);
        const currentValue = item.get(prop);
        if (currentValue !== isSelected) {
          item.set(prop, isSelected);
        }
      });
    });
  }),

  /**
   * Property name used to identify selected records. Should begin with underscore.
   *
   * @property selectProperty
   * @type {String}
   * @default "_selected"
   * @static
   * @readOnly
   * @required
   */
  selectProperty: '_selected',

  /**
   * Array of table records
   *
   * @property data
   * @type {Array}
   * @default []
   * @required
   */

  /**
   * Array of column configs for the table.
   * See http://onechiporenko.github.io/ember-models-table
   *
   * ```javascript
   * [{
   *  propertyName: 'id',
   *  title: 'ID'
   * }, {
   *  title: '',
   *  template: 'components/leaflet-table/actions',
   *  className: 'text-center text-nowrap'
   * }]
   * ```
   *
   * @property dataColumns
   * @type {Array}
   * @required
   * @default []
   */

  /**
   * Column configs for the checkbox column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property checkColumns
   * @type {Object}
   * @required
   */
  checkColumn: computed(function () {
    return {
      component: 'components/md-models-table/components/check',
      disableFiltering: true,
      mayBeHidden: false,
      componentForSortCell: 'components/md-models-table/components/check-all',
      className: 'text-center',
    };
  }),

  /**
   * Column configs for the action column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property actionsColumn
   * @type {Object}
   * @required
   */
  /**
   * Flag to hide the actions column
   *
   * @property hideActionsColumn
   * @type {Boolean}
   * @default false
   */
  hideActionsColumn: false,

  actionsColumn: computed('allActions', 'hideActionsColumn', function () {
    if (this.hideActionsColumn) {
      return null;
    }

    let all = this.allActions;

    return {
      title: 'Actions',
      className: 'md-actions-column',
      component: all
        ? 'control/md-record-table/buttons'
        : 'control/md-record-table/buttons/show',
      disableFiltering: !all,
      componentForFilterCell: all
        ? 'control/md-record-table/buttons/filter'
        : null,
      showSlider: this.showSlider,
    };
  }),

  // Remove our custom selectedItems - let parent handle it
  // selectedItems is managed by the parent ember-models-table component

  /**
   * Callback on row selection.
   *
   * @method select
   * @param {Object} rec Selected record.
   * @param {Number} index Selected row index.
   * @param {Array} selected Selected records.
   * @return {Array} Selected records.
   */
  select(rec, index, selected) {
    return selected;
  },
});
