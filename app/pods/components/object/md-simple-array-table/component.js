import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import ArrayTable from '../md-array-table/component';

@classic
export default class MdSimpleArrayTable extends ArrayTable {
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
   *       {{input/md-input value=val.item.value
   *       placeholder="Enter value"}}
   *   </td>
   * {{/object/md-simple-array-table}}
   * ```
   * @class md-simple-array-table
   * @module mdeditor
   * @submodule components-object
   * @extends md-array-table
   * @constructor
   */

  layoutName = 'components/object/md-array-table';

  simple = true;

  /**
   * Convert the input 'primitive' array to an 'ember' array of objects
   *
   * @property arrayValues
   * @type {Array}
   * @category computed
   * @requires value.[]
   */
  @computed('value.[]')
  get arrayValues() {
    let items = this.value;

    if(items === undefined) {
      items = [];
      //items[0] = '';
    }

    return items.reduce(function (acc, value) {
      acc.pushObject({
        value: value
      });
      return acc;
    }, []);
  }

  set arrayValues(value) {
    let newValue = value
      .filterBy('value')
      .mapBy('value');
    this.set('value', newValue);
    return value;
  }

  /**
   * Set the value when arrayValues is updated
   *
   * @property valuesObserver
   * @type {Observer}
   * @category computed
   * @requires arrayValues.@each.value
   */
  @observes('arrayValues.@each.value')
  valuesObserver() {
    this.set('arrayValues', this.arrayValues);
  }
}
