import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
/**
 * @submodule components-object
 * @module mdeditor
 */

import EmberObject from '@ember/object';

import Component from '@ember/component';
import { A } from '@ember/array';

@classic
@attributeBindings('data-spy')
export default class MdAddress extends Component {
 /**
  * mdJSON object containing the 'address' array.
  *
  * @property model
  * @type Object
  * @required
  */

 /**
  * List of mdJSON 'address' object attributes to display in
  * md-object-table to aid in choosing the address to edit or
  * delete.
  * The property is passed to md-object-table for configuration.
  *
  * @property attributes
  * @type String
  * @default ''
  */
 attributes = '';

 /**
  * Name to place on the mdEditor panel header for entry and edit of
  * 'address' objects.
  * The property is passed to md-object-table for configuration.
  *
  * @property label
  * @type String
  * @default 'Address'
  */
 label = 'Address';

 templateClass = EmberObject.extend({
   init() {
     undefined;

     this.set('addressType', A());
     this.set('deliveryPoint', A());
   }
 });
}
