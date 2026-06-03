import { observer } from '@ember/object';
import classic from 'ember-classic-decorator';
import Table from 'mdeditor/pods/components/md-models-table/component';

/**
 * @module mdeditor
 * @submodule components-control
 */

/**
 * Table with action on row click. Used to select objects (records).
 *
 * ```handlebars
 * {{control/md-select-table
 *   data=model.data
 *   columns=model.columns
 *   select=callback
 * }}
 * ```
 *
 * @class md-select-table
 * @extends models-table
 */
@classic
class MdSelectTableComponent extends Table {
  classNames = ['md-select-table'];

  filteringIgnoreCase = true;

  /**
   * Callback on row selection.
   *
   * @method select
   * @param {Array} selected Selected items.
   * @return {Array}
   */
  select(selected) {
    return selected;
  }
}

MdSelectTableComponent.reopen({
  _onSelectedItemsChanged: observer('selectedItems.[]', function () {
    this.select(this.selectedItems);
  }),

  actions: {
    clickOnRow() {
      this._super(...arguments);
    },
  },
});

export default MdSelectTableComponent;
