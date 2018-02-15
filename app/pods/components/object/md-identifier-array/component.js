import Ember from 'ember';
import {
  Validations
} from '../md-identifier/component';

const {
  A,
  Component
} = Ember;

export default Component.extend({

  init() {
    this._super(...arguments);

    if(!this.get('model')) {
      this.set('model', A());
    }
  },

  /**
   * mdEditor class for input and edit of mdJSON 'identifier' object
   * arrays.
   * The class manages the maintenance of an array of identifier
   * objects using the md-objectroute-table class.
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-identifier-array
   * @uses md-objectroute-table
   * @constructor
   */

  attributeBindings: ['data-spy'],

  /**
   * mdJSON object containing the 'identifier' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * List of mdJSON 'identifier' object attributes to display in
   * md-object-table to aid in choosing the identifier to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes: 'identifier,namespace,description',

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'identifier' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Identifier'
   */
  label: 'Identifier',

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: Ember.Object.extend(Validations, {
    init() {
      this._super(...arguments);
      this.set('authority', {});
    }
  })
});
