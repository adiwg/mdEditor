/**
 * @module mdeditor
 * @submodule components-input
 */

import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  /**
   * Input, edit, display a single item
   *
   * @class md-input
   * @constructor
   */

  classNameBindings: ['label:form-group'],

  /**
   * Value of the input.
   * Value sets the initial value and returns the edited result
   *
   * @property value
   * @type String
   * @required
   */

  /**
   * Type of data represented by the value string.
   * HTML5 types may be specified ('text', 'number', etc.)
   *
   * @property type
   * @type String
   * @default text
   */
  type: 'text',

  /**
   * The form label to display
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * Whether a value is required
   *
   * @property required
   * @type Boolean
   * @default false
   */
  required: false,

  /**
   * Whether a input is disabled
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * Whether the input disabled state is controlled by 'edit' button.
   *
   * @property confirmEdit
   * @type Boolean
   * @default false
   */
  confirmEdit: false,

  /**
   * Tootip for the confirm button.
   *
   * @property confirmTip
   * @type String
   * @default undefined
   */

  /**
   * Maximum number of characters for each input string.
   * If no maxlength is specified the length will not be restricted
   *
   * @property maxlength
   * @type Number
   * @default null
   */
  maxlength: null,

  /**
   * Text displayed in empty inputs
   *
   * @property placeholder
   * @type String
   * @default null
   */
  placeholder: null,

  /**
   * CSS class to set on the input control
   *
   * @property class
   * @type String
   * @default 'form-control'
   */
  inputClass: 'form-control',

  /**
   * Whether the input is enabled based on disabled and confirmEdit state.
   *
   * @property notEnabled
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires disabled, confirmEdit
   */
  notEnabled: computed('confirmEdit', 'disabled', function () {
    return this.get('confirmEdit') || this.get('disabled');
  }),

  actions: {
    allowEdit() {
      this.set('confirmEdit', false);
    }
  }
});
