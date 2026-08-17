import { computed, get, defineProperty, observer } from '@ember/object';
import { next } from '@ember/runloop';
import { A } from '@ember/array';
import classic from 'ember-classic-decorator';
import Table from 'mdeditor/pods/components/md-models-table/component';

/**
 * @module mdeditor
 * @submodule components-control
 */

/**
 * Table used to display objects. Includes column to toggle selection for all
 * rows.
 *
 * ```handlebars
 * {{control/md-record-table
 *   data=model.data
 *   columns=model.columns
 *   select=callback
 * }}
 * ```
 *
 * @class md-record-table
 * @extends models-table
 */
@classic
class MdRecordTableComponent extends Table {
  classNames = ['md-record-table'];

  selectProperty = '_selected';

  hideActionsColumn = false;

  init() {
    this.dataColumns = this.dataColumns || [];
    this.filteringIgnoreCase = this.filteringIgnoreCase || true;
    this.multipleSelect = this.multipleSelect || true;

    defineProperty(
      this,
      'columns',
      computed('dataColumns', 'checkColumn', 'actionsColumn', function () {
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

    super.init(...arguments);

    this.initFromSelectProperty();
  }

  /**
   * Seed selectedItems from the selectProperty flag on each data item.
   * Called on init and whenever the data reference changes.
   */
  initFromSelectProperty() {
    let prop = this.selectProperty;
    let data = this.data;

    if (!prop || !data) {
      return;
    }

    let selected = A(data.filter((item) => get(item, prop)));
    this.set('selectedItems', selected);
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
}

MdRecordTableComponent.reopen({
  dataObserver: observer('data', function () {
    this.initFromSelectProperty();
  }),

  syncSelectedItemsObserver: observer('selectedItems.[]', function () {
    next(() => {
      let prop = this.selectProperty;
      let data = this.data;
      let parentSelectedItems = this.get('selectedItems');

      if (!prop || !data) {
        return;
      }

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

  checkColumn: computed(function () {
    return {
      component: 'components/md-models-table/components/check',
      disableFiltering: true,
      mayBeHidden: false,
      componentForSortCell: 'components/md-models-table/components/check-all',
      className: 'text-center',
    };
  }),

  actionsColumn: computed('allActions', 'hideActionsColumn', {
    get() {
      if (this._actionsColumn !== undefined) return this._actionsColumn;

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
    },
    set(key, value) {
      this._actionsColumn = value;
      return value;
    },
  }),
});

export default MdRecordTableComponent;
