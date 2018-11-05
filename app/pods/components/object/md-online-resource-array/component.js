import {
  once
} from '@ember/runloop';
import {
  Validations
} from '../md-online-resource/component';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';
import Component from '@ember/component';
import EmberObject from '@ember/object';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    if(!this.get('model')) {
      once(this, () => this.set('model', A()));
    }
  },

  /**
   * mdEditor class for input and edit of mdJSON 'onlineResource' object
   * arrays.
   * The class manages the maintenance of an array of online resource
   * objects using the md-object-table class.
   *
   * @module mdeditor
   * @submodule components-object
   * @class md-online-resource-array
   * @constructor
   */

  attributeBindings: ['data-spy'],

  /**
   * mdJSON object containing the 'onlineResource' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * Display the image picker and preview
   *
   * @property imagePicker
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Truncate the text
   *
   * @property ellipsis
   * @type {Boolean}
   * @default true
   */
  ellipsis: true,

  /**
   * List of mdJSON 'onlineResource' object attributes to display in
   * md-object-table to aid in choosing the onlineResource to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes: 'name,uri',

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'onlineResource' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Online Resource'
   */
  label: 'Online Resource',

  /**
   * If true, a box shadow will be rendered around the card.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow: true,

  /**
   * The template to use for the preview table rows. If not overridden, will use
   * the `md-image-preview` template if `imagePicker = true`.
   *
   * @property previewTemplate
   * @type {String}
   * @readOnly
   * @category computed
   * @requires imagePicker
   */
  previewTemplate: computed('imagePicker', function () {
    return this.get('imagePicker') ?
      "object/md-online-resource-array/md-image-preview" : null;
  }),

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass: EmberObject.extend(Validations, {
    init() {
      this._super(...arguments);
      //this.set('uri', null);
    }
  })
});
