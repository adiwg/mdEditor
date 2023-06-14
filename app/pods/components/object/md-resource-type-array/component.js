import Component from '@ember/component';
import EmObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  type: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
  ],
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
    },
  }),
});
