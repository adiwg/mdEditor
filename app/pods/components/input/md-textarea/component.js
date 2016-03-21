import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Value of the input
   *
   * @property value
   * @type {String}
   */

  /**
   * The form label to display
   *
   * @property label
   * @type {String}
   */

  /**
   * The text to display when empty
   *
   * @property placeholder
   * @type {String}
   */

  /**
   * Whether the value is required
   *
   * @property required
   * @type {Boolean}
   * @default false
   */
  required: false,

  /**
   * Maximum number of characters allowed
   *
   * @property maxlength
   * @type {Number}
   */

  /**
   * Enable autoresizing on an input
   *
   * @property autoresize
   * @type {Boolean}
   */
  autoresize: true,

  /**
   * Set the maximum width of the resizeable element in pixels.
   *
   * @property maxwidth
   * @type {Number}
   */

  /**
   * Set the maximum height of the element in pixels.
   *
   * @property maxheight
   * @type {Number}
   */

  /**
   * Set the minimum number of rows for the element. Recommended for textareas.
   *
   * @property rows
   * @type {Number}
   */
  rows: 2,

  /**
   * Set the maximum number of rows for the element. Recommended for textareas.
   *
   * @property maxrows
   * @type {Number}
   */
  maxrows: 10,
  
  /**
   * Class to set on the textarea
   *
   * @property class
   * @type {string}
   */
  class: 'form-control'
});
