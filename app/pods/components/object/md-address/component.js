/**
 * @module mdeditor
 * @submodule components-object
 */

import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * mdEditor class for input and edit of mdJSON address objects.
   *
   * @class md-address
   * @constructor
   */

  /**
   * mdJSON 'address' object to be edited.
   *
   * @property address
   * @type Object
   * @required
   */

  panelId: Ember.computed(function () {
    return Ember.generateGuid(null, 'panel');
  }),

  /**
   * Indicate whether the address object is not empty.
   *
   * @property isEmpty
   * @type Boolean
   */

  notEmpty: Ember.computed('address', 'address.city',
    'address.deliveryPoint', 'address.adminsitrativeArea',
    'address.postalCode', 'address.country',
    'address.electronicMailAddress.[]',
    function () {
      let address = this.get('address');
      let keys = Object.keys(address);

      return keys.some(function (key) {
        return !Ember.isEmpty(address[key]);
      });
    })

});
