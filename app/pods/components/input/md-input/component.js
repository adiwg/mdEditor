import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * Type of input
   *
   * @property type
   * @type {String}
   * @default text
   */
  type: 'text',

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
   * Text to display next to the checkbox
   *
   * @property text
   * @type {String}
   */

  /**
   * Maximum number of characters allowed
   *
   * @property maxlength
   * @type {Number}
   */

  /**
   * Class to set on the input
   *
   * @property class
   * @type {string}
   */
  class: 'form-control'
});
