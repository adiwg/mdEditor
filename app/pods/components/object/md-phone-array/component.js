import Component from '@ember/component';
import EmObject from '@ember/object';
import { A } from '@ember/array';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'phoneNumber': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('format', {
      type: 'phone',
      isWarning: true,
      message: 'This field should be a valid phone number.'
    })
  ]
});

export default Component.extend({

  /**
   * mdEditor class for input and edit of mdJSON 'phone' object.
   * The class manages the maintenance of an array of phone objects.
   *
   * @class md-phone-array
   * @module mdeditor
   * @submodule components-object
   * @constructor
   */

  attributeBindings: ['data-spy'],

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmObject.extend(Validations, {
    init() {
      this._super(...arguments);
      this.set('service', A());
    }
  })

});
