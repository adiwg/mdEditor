import Ember from 'ember';

const {
  Object: EmObject,
  A
} = Ember;

export default Ember.Component.extend({

  /**
   * mdEditor class for input and edit of mdJSON 'phone' object.
   * The class manages the maintenance of an array of phone objects.
   *
   * @class md-phone-array
   * @module mdeditor
   * @submodule components-object
   * @constructor
   */

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmObject.extend({
    init() {
      this.set('service', A());
    }
  })

});
