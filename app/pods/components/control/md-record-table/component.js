import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { computed, get } from '@ember/object';
import { warn } from '@ember/debug';
import { isArray, A } from '@ember/array';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

@classic
export default class MdRecordTableComponent extends Component {
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
   * @class md-record-table
   * @extends Component
   */

  @service('emt-themes/md-bootstrap3') themeInstance;

  classNames = ['md-record-table'];

  init() {
    super.init(...arguments);

    this.dataColumns = this.dataColumns || [];
    this.filteringIgnoreCase = this.filteringIgnoreCase !== false;
    this.multipleSelect = this.multipleSelect !== false;
    this._expandedItems = A(this.expandedItems || []);
  }

  /**
   * Property name used to identify selected records. Should begin with underscore.
   *
   * @property selectProperty
   * @type {String}
   * @default "_selected"
   */
  selectProperty = '_selected';

  @computed('dataColumns', 'checkColumn', 'actionsColumn')
  get columns() {
    let chk = this.checkColumn;
    let actionCol = this.actionsColumn;
    let cols = A().concat(this.dataColumns);

    if (chk) {
      cols = [chk].concat(cols);
    }

    if (actionCol) {
      cols.push(actionCol);
    }

    return cols;
  }

  @computed()
  get checkColumn() {
    return {
      propertyName: '_selected',
      component: 'check',
      disableFiltering: true,
      disableSorting: true,
      mayBeHidden: false,
      componentForSortCell: 'md-models-table/components/check-all',
      className: 'text-center'
    };
  }

  /**
   * Flag to hide the actions column
   *
   * @property hideActionsColumn
   * @type {Boolean}
   * @default false
   */
  hideActionsColumn = false;

  @computed('allActions', 'hideActionsColumn')
  get actionsColumn() {
    if (this.hideActionsColumn) {
      return null;
    }

    let all = this.allActions;

    return {
      title: 'Actions',
      propertyName: 'id',
      className: 'md-actions-column',
      component: all ?
        'record-table-buttons' :
        'record-table-buttons-show',
      disableFiltering: !all,
      disableSorting: true,
      componentForFilterCell: all ?
        'control/md-record-table/buttons/filter' : null,
      showSlider: this.showSlider
    };
  }

  @computed('data.@each.{_selected}', 'selectProperty')
  get selectedItems() {
    let prop = this.selectProperty;
    if (!this.data) {
      return A();
    }
    return A(A(this.data).filterBy(prop));
  }

  set selectedItems(v) {
    if (!isArray(v)) {
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
  handleDisplayDataChanged(settings) {
    // Sync _selected property on records based on selectedItems from the table
    let prop = this.selectProperty;
    let data = this.data;
    let selected = settings.selectedItems || [];

    if (data) {
      data.forEach((record) => {
        let isSelected = selected.includes(record);
        if (get(record, prop) !== isSelected) {
          record.set ? record.set(prop, isSelected) : (record[prop] = isSelected);
        }
      });
    }

    this.select(null, null, A(selected));

    if (this.onDisplayDataChanged) {
      this.onDisplayDataChanged(settings);
    }
  }

  @action
  expandRecord(index, record) {
    let expanded = this._expandedItems;
    let idx = expanded.indexOf(record);
    if (idx === -1) {
      expanded.pushObject(record);
    } else {
      expanded.removeObject(record);
    }
    this.notifyPropertyChange('_expandedItems');
  }

  /**
   * columnComponents hash mapping string keys to components for v5 column resolution
   */
  @computed()
  get columnComponents() {
    return {};
  }
}
