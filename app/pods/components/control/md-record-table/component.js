import Ember from 'ember';
import Table from 'ember-models-table/components/models-table';

const {
  get,
  computed,
  set,
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
   * @type {Array|Boolean}
   * @required
   */
  checkColumn: {
    template: 'components/control/md-record-table/templates/check',
    useFilter: false,
    mayBeHidden: false,
    templateForSortCell: 'components/control/md-record-table/templates/check-all',
    className: 'text-center'
  },

  columns: computed('dataColumns', 'checkColumn', function() {
    let chk = get(this, 'checkColumn');

    if(chk) {
      return [chk].concat(get(this, 'dataColumns'));
    }

    return get(this, 'dataColumns');
  }),

  filteringIgnoreCase: true,
  //rowTemplate: 'components/control/md-select-table/row',

  customIcons: {
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
    'deselect-all-rows': 'fa fa-fw fa-square-o'
  },

  customClasses: {
    'table': 'table table-striped table-bordered table-condensed table-hover'
  },

  multipleSelect: true,

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

      let sel = get(this, '_selectedItems');

      rec.toggleProperty('_selected');
      this.get('select')(rec, idx, sel);
    },

    toggleAll() {
      let selected = get(this, '_selectedItems');
      let data = get(this, 'data');

      if(get(selected, 'length') === get(data, 'length')) {
        selected.setEach('_selected', undefined);
        selected.clear();
        this.userInteractionObserver();
        return false;
      }

      data.setEach('_selected', true);
      set(this, '_selectedItems', data.slice());

      this.get('select')(null, null, selected);
      this.userInteractionObserver();
    }
  }
});
