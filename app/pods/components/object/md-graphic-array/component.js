import Ember from 'ember';

const {
  Component,
  A
} = Ember;

export default Component.extend({
  /**
   * mdEditor class for input and edit of mdJSON 'graphic' object arrays. The
   * class manages the maintenance of an array of graphic objects using the
   * md-object-table class.
   *
   * ```handlebars
   * \{{object/md-graphic-array
   *   model=model
   *   data-spy="Graphic"
   *   button-text="Add Graphic"
   *   label="Graphic"
   * }}
   * ```
   *
   * @class md-graphic-array
   * @constructor
   */

   attributeBindings: ['data-spy'],

  /**
   * mdJSON object containing the 'graphic' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * List of mdJSON 'graphic' object attributes to display in
   * md-object-table to aid in choosing the onlineResource to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes: 'fileName,fileDescription',

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'onlineResource' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Graphic'
   */
  label: 'Graphic',

  /**
   * Label for the 'add item' button.
   * The property is passed to md-object-table for configuration.
   *
   * @property buttonText
   * @type String
   * @default 'Graphic'
   */
  buttonText: 'Add Graphic',

  previewTemplate: 'object/md-graphic-array/md-graphic-preview',

  templateClass: Ember.Object.extend({
    init() {
      this.set('fileConstraint', A());
      this.set('fileUri', A());
    }
  })
});
