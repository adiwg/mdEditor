import Ember from 'ember';
import ArrayTable from '../md-array-table/component';

const {
  computed,
  observer
} = Ember;

export default ArrayTable.extend({
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

  layoutName: 'components/object/md-array-table',

  /**
   * Convert the input 'primitive' array to an 'ember' array of objects
   *
   * @property arrayValues
   * @type {Array}
   * @category computed
   * @requires value.[]
   */
  arrayValues: computed('value.[]', {
    get() {
      let items = this.get('value');

      if (items === undefined) {
        items = [];
        items[0] = '';
      }

      return items.reduce(function(acc, value) {
        acc.pushObject({
          value: value
        });
        return acc;
      }, []);
    },

    set(key, value) {
      this.set('value', value
        .filterBy('value')
        .mapBy('value'));
      return value;
    }
  }),

  /**
   * Set the value when arrayValues is updated
   *
   * @property valuesObserver
   * @type {Observer}
   * @category computed
   * @requires arrayValues.@each.value
   */
  valuesObserver: observer('arrayValues.@each.value', function() {
    this.set('arrayValues', this.get('arrayValues'));
  })
});
