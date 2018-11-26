import { get } from '@ember/object';
import Table from 'mdeditor/pods/components/md-models-table/component';

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

  /**
   * Callback on row selection.
   *
   * @method select
   * @param {Array} selected Selected items.
   * @return {Array}
   */
  select(selected) {
    return selected;
  },

  actions: {
    clickOnRow() {
      this._super(...arguments);

      let sel = get(this, 'selectedItems');

      this.get('select')(sel);
    }
  }
});
