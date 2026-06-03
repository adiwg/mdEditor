import {
  observer,
  computed,
  action,
  notifyPropertyChange,
} from '@ember/object';
import { A } from '@ember/array';
import { schedule } from '@ember/runloop';
import classic from 'ember-classic-decorator';
import ArrayTable from '../md-array-table/component';

/**
 * mdEditor component for input and edit of arrays of scalars. The
 * component is rendered as an editable table.
 *
 * ```handlebars
 * {{#object/md-simple-array-table
 *   title="Simple"
 *   required=false
 *   plain=true
 *   value=model as |val|
 * }}
 *   <td>
 *     {{input/md-input value=val.item.value placeholder="Enter value"}}
 *   </td>
 * {{/object/md-simple-array-table}}
 * ```
 *
 * @class md-simple-array-table
 * @module mdeditor
 * @submodule components-object
 * @extends md-array-table
 */
@classic
class MdSimpleArrayTableComponent extends ArrayTable {
  layoutName = 'components/object/md-array-table';

  simple = true;

  @action
  addItem() {
    if (!this.value) {
      this.set('value', A());
    }

    this._suppressObserver = true;

    this.value.pushObject('');

    notifyPropertyChange(this, 'value');
    notifyPropertyChange(this, 'arrayValues');
    this.valueChanged();

    schedule('afterRender', this, () => {
      this._suppressObserver = false;
    });
  }

  @action
  deleteItem(item, idx) {
    if (this.value && this.value.length > idx) {
      this.value.removeAt(idx);
    }

    notifyPropertyChange(this, 'value');
    notifyPropertyChange(this, 'arrayValues');
    this.valueChanged();
  }
}

MdSimpleArrayTableComponent.reopen({
  arrayValues: computed('value.[]', {
    get() {
      let items = this.value;

      if (items === undefined) {
        items = [];
      }

      return items.reduce(function (acc, value) {
        acc.pushObject({
          value: value,
        });
        return acc;
      }, []);
    },

    set(key, value) {
      let newValue = value.filterBy('value').mapBy('value');
      this.set('value', newValue);
      return value;
    },
  }),

  valuesObserver: observer('arrayValues.@each.value', function () {
    if (this._suppressObserver) {
      return;
    }
    this.set('arrayValues', this.arrayValues);
  }),
});

export default MdSimpleArrayTableComponent;
