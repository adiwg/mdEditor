import Ember from 'ember';

export default Ember.Component.extend({
  
  /**
   * Input, edit, display a boolean value
   *
   * @class md-boolean
   * @constructor
   */
  
  /**
   * Value of the input.
   * The edited value is returned
   *
   * @property value
   * @type Boolean
   * @default false
   */
   value: false,

  /**
   * Text to display next to the checkbox
   *
   * @property text
   * @type String
   */

  /**
   * The form label to display
   *
   * @property label
   * @type String
   * @default null
   */
  label: null
  
});
