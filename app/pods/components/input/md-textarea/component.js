/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Input, edit, display a multi-line, expandable, text area.
   *
   * @class md-textarea
   * @constructor
   */

  attributeBindings: ['data-spy'],
  classNames: ['md-textarea'],
  classNameBindings: ['label:form-group', 'required','embedded:md-embedded'],

  /**
   * Initial value, returned value.
   *
   * @property value
   * @type String
   * @return String
   * @required
   */

  /**
   * Form label for textarea
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * The string to display when no option is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Select one option'
   */
  placeholder: "Select one option",

  /**
   * Indicates whether the value is required
   *
   * @property required
   * @type Boolean
   * @default false
   */
  required: false,

  /**
   * Maximum number of characters allowed.
   * If maxlength is not provided the number of characters will
   * not be restricted.
   *
   * @property maxlength
   * @type Number
   * @default null
   */
  maxlength: null,

  /**
   * Enable auto-resizing of the textarea
   *
   * @property autoresize
   * @type Boolean
   * @default true
   */
  autoresize: true,

  /**
   * Set the maximum width of the resizeable element in pixels.
   * If maxwidth is not provided width will not be restricted.
   *
   * @property maxwidth
   * @type Number
   * @default null
   */
  maxwidth: null,

  /**
   * Set the maximum height of the resizable element in pixels.
   * If maxheight is not provided height will not be restricted.
   *
   * @property maxheight
   * @type {Number}
   * @default null
   */
  maxheight: null,

  /**
   * Set the minimum number of rows for the element.
   * Recommended for textareas.
   *
   * @property rows
   * @type Number
   * @default 2
   */
  rows: 2,

  /**
   * Set the maximum number of rows for the element.
   * Recommended for textareas.
   *
   * @property maxrows
   * @type Number
   * @default 10
   */
  maxrows: 10,

  /**
   * Class to set on the textarea
   *
   * @property class
   * @type {string}
   * @default 'form-control'
   */
  class: 'form-control',

  _didInsertArea(){
    this.scheduleMeasurement();
  },

});
