import EmberObject from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    if (!this.model) {
      this.set('model', A());
    }
  },

  /**
   * mdEditor class for input and edit of mdJSON 'citation' object
   * arrays.
   * The class manages the maintenance of an array of citation
   * objects using the md-object-table class.
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-citation-array
   * @constructor
   */

  attributeBindings: ['data-spy'],

  /**
   * mdJSON object containing the 'citation' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * List of mdJSON 'citation' object attributes to display in
   * md-object-table to aid in choosing the citation to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'title'
   */
  attributes: 'title',

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'citation' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Citation'
   */
  label: 'Citation',

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmberObject.extend({
    init() {
      this._super(...arguments);
      //this.set('authority', {});
    },
  }),
});
