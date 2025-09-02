import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { get, defineProperty, action, computed } from '@ember/object';
import Table from 'mdeditor/pods/components/md-models-table/component';
import {
  warn
} from '@ember/debug';
import { isArray, A } from '@ember/array';

@classic
@classNames('md-record-table')
export default class MdRecordTable extends Table {
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

    defineProperty(this, 'columns', computed('dataColumns', 'checkColumn',
      function () {
        let chk = this.checkColumn;
        let action = this.actionsColumn;
        let cols = A().concat(this.dataColumns);

        if(chk) {
          cols = [chk].concat(cols);
        }

        if(action) {
          cols.push(action);
        }

        return cols;
      }));

    super.init(...arguments);
  }

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
  selectProperty = '_selected';

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
  @computed
  get checkColumn() {

    return {
      component: 'components/md-models-table/components/check',
      disableFiltering: true,
      mayBeHidden: false,
      componentForSortCell: 'components/md-models-table/components/check-all',
      className: 'text-center'
    };
  }

  /**
   * Column configs for the action column.
   * See http://onechiporenko.github.io/ember-models-table
   *
   *
   * @property actionsColumn
   * @type {Object}
   * @required
   */
  @computed('allActions')
  get actionsColumn() {
    let all = this.allActions;

    return {
      title: 'Actions',
      className: 'md-actions-column',
      component: all ?
        'control/md-record-table/buttons' :
        'control/md-record-table/buttons/show',
      disableFiltering: !all,
      componentForFilterCell: all ?
        'control/md-record-table/buttons/filter' : null,
      showSlider: this.showSlider
    };
  }

  @computed
  get selectedItems() {
    let prop = this.selectProperty;

    return this.data
      .filterBy(prop)
      .toArray();

  }

  set selectedItems(v) {
    if(!isArray(v)) {
      warn('`selectedItems` must be an array.', false, {
        id: '#emt-selectedItems-array'
      });
    }
    return A(v);
  }

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
  }

  @action
  clickOnRow(idx, rec) {
    // TODO: This call to super is within an action, and has to refer to the parent
    // class's actions to be safe. This should be refactored to call a normal method
    // on the parent class. If the parent class has not been converted to native
    // classes, it may need to be refactored as well. See
    // https://github.com/scalvert/ember-native-class-codemod/blob/master/README.md
    // for more details.
    super.actions.clickOnRow.call(this, ...arguments);

    let prop = this.selectProperty;
    let sel = this.selectedItems;

    rec.toggleProperty(prop);
    this.select(rec, idx, sel);
  }

  @action
  toggleAllSelection() {
    //this._super(...arguments);
    let selectedItems = this.selectedItems;
    let data = this.data;
    const allSelectedBefore = get(selectedItems, 'length') === get(data,
      'length');
    this.selectedItems
      .clear();

    if(!allSelectedBefore) {
      this.selectedItems
        .pushObjects(data.toArray());
    }
    this.userInteractionObserver();

    let selected = this.selectedItems;
    let prop = this.selectProperty;
    //let data = get(this, 'data');

    if(get(selected, 'length')) {
      selected.setEach(prop, true);
    } else {
      data.setEach(prop, false);
    }
    this.select(null, null, selected);
  }
}
