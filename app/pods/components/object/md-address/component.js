/**
 * @submodule components-object
 * @module mdeditor
 */

import EmberObject from '@ember/object';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { A } from '@ember/array';

@classic
export default class MdAddressComponent extends Component {
  /**
   * mdEditor class for input and edit of mdJSON 'address' object
   * arrays. The class manages the maintenance of an array of address
   * objects using the md-object-table class.
   *
   * @class md-address
   * @constructor
   * @requires md-object-table
   */

  attributeBindings = ['data-spy'];

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
      this._super(...arguments);

      this.set('addressType', A());
      this.set('deliveryPoint', A());
    }
  });
}
