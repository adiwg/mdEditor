import Ember from 'ember';
import Table from 'mdeditor/pods/components/md-models-table/component';

const {
  get,
  computed,
  A
} = Ember;

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

  classNames: ['md-record-table'],

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
  dataColumns: A(),

  /**
   * Column configs for the checkbox column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property checkColumns
   * @type {Object}
   * @required
   */
  checkColumn: {
    component: 'components/md-models-table/components/check',
    disableFiltering: true,
    mayBeHidden: false,
    componentForSortCell: 'components/md-models-table/components/check-all',
    className: 'text-center'
  },

  /**
   * Column configs for the action column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property checkColumns
   * @type {Object}
   * @required
   */
  actionsColumn: computed('allActions', function () {
    let all = this.get('allActions');

    return {
      title: 'Actions',
      component: all ?
        'control/md-record-table/buttons' : 'control/md-record-table/buttons/show',
      disableFiltering: !all,
      componentForFilterCell: all ? 'control/md-record-table/buttons/filter' : null
    };
  }),

  columns: computed('dataColumns', 'checkColumn', function () {
    let chk = get(this, 'checkColumn');
    let action = get(this, 'actionsColumn');
    let cols = get(this, 'dataColumns');

    if(chk) {
      cols = [chk].concat(cols);
    }

    if(action) {
      cols.push(action);
    }

    return cols;
  }),

  filteringIgnoreCase: true,
  //rowTemplate: 'components/control/md-select-table/row',

  multipleSelect: true,
  preselectedItems: computed(function () {
    let prop = this.get('selectProperty');

    return this.get('data')
      .filterBy(prop);
  }),

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

  actions: {
    clickOnRow(idx, rec) {
      this._super(...arguments);

      let prop = this.get('selectProperty');
      let sel = get(this, '_selectedItems');

      rec.toggleProperty(prop);
      this.get('select')(rec, idx, sel);
    },

    toggleAllSelection() {
      this._super(...arguments);

      let selected = get(this, '_selectedItems');
      let prop = this.get('selectProperty');
      let data = get(this, 'data');

      if(get(selected, 'length')) {
        selected.setEach(prop, true);
        return;
      }

      data.setEach(prop, false);

      this.get('select')(null, null, selected);
    }
  }
});
