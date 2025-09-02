import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Table from 'mdeditor/pods/components/md-models-table/component';

@classic
@classNames('md-select-table')
export default class MdSelectTable extends Table {
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

 @action
 clickOnRow() {
   // TODO: This call to super is within an action, and has to refer to the parent
   // class's actions to be safe. This should be refactored to call a normal method
   // on the parent class. If the parent class has not been converted to native
   // classes, it may need to be refactored as well. See
   // https://github.com/scalvert/ember-native-class-codemod/blob/master/README.md
   // for more details.
   super.actions.clickOnRow.call(this, ...arguments);

   let sel = this.selectedItems;

   this.select(sel);
 }
}
