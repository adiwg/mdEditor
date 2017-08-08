import Ember from 'ember';
import Table from 'ember-models-table/components/models-table';

const {
  get
} = Ember;

export default Table.extend({
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Table with action on row click. Used to select objects(records).
   *
   *```handlebars
   * \{{control/md-select-table
   *   data=model.data
   *   columns=model.columns
   *   select=callback
   * }}
   * ```
   *
   * @class md-select-table
   * @extends models-table
   */

  classNames: ['md-select-table'],

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
   * @property columns
   * @type {Array}
   * @required
   * @default []
   */

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
    'caret': 'fa fa-caret-down'
  },
  customClasses: {
    'table': 'table table-striped table-bordered table-condensed table-hover'
  },

  /**
   * Callback on row selection.
   *
   * @method select
   * @param {Array} selected Selected items.
   * @return {Array}
   */
  select(selected) {
    console.info(selected);
    return selected;
  },

  actions: {
    clickOnRow() {
      this._super(...arguments);

      let sel = get(this, '_selectedItems');

      this.get('select')(sel);
    }
  }
});
