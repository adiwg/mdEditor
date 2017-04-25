import Ember from 'ember';

const {
  Component,
  defineProperty,
  computed,
  isBlank,
  assert
} = Ember;

export default Component.extend({
  /**
   * Input, edit, display a single item
   *
   * @module mdeditor
   * @submodule components-input
   * @class md-input
   * @constructor
   */

  init() {
    this._super(...arguments);

    let model = this.get('model');
    let valuePath = this.get('valuePath');

    if (isBlank(model) !== isBlank(valuePath)) {
      assert(
        `You must supply both model and valuePath to ${this.toString()} or neither.`
      );
    }

    if (!isBlank(model)) {
      if (this.get(`model.${valuePath}`) === undefined) {
        Ember.debug(
          `model.${valuePath} is undefined in ${this.toString()}.`
        );

        //Ember.run.once(()=>model.set(valuePath, ""));
      }

      defineProperty(this, 'value', computed.alias(`model.${valuePath}`));

      defineProperty(this, 'validation', computed.alias(
        `model.validations.attrs.${valuePath}`).readOnly());

      defineProperty(this, 'required', computed(
        'validation.options.presence.presence',
        'validation.options.presence.disabled',
        function() {
          return this.get('validation.options.presence.presence') &&
            !this.get('validation.options.presence.disabled');
        }).readOnly());

      defineProperty(this, 'notValidating', computed.not(
        'validation.isValidating').readOnly());

      defineProperty(this, 'hasContent', computed.notEmpty('value').readOnly());

      defineProperty(this, 'hasWarnings', computed.notEmpty(
        'validation.warnings').readOnly());

      defineProperty(this, 'isValid', computed.and('hasContent',
        'validation.isTruelyValid').readOnly());

      defineProperty(this, 'shouldDisplayValidations', computed.or(
        'showValidations', 'didValidate',
        'hasContent').readOnly());

      defineProperty(this, 'showErrorClass', computed.and('notValidating',
        'showErrorMessage',
        'hasContent', 'validation').readOnly());

      defineProperty(this, 'showErrorMessage', computed.and(
        'shouldDisplayValidations',
        'validation.isInvalid').readOnly());

      defineProperty(this, 'showWarningMessage', computed.and(
        'shouldDisplayValidations',
        'hasWarnings', 'isValid').readOnly());
    }
  },

  classNames: ['md-input'],
  classNameBindings: ['label:form-group', 'required'],
  attributeBindings: ['data-spy'],

  /**
   * Value of the input.
   * Value sets the initial value and returns the edited result.
   * This property is overridden if valuePath and model are supplied.
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
   * The model or object containing the input value. Only needed for validation.
   *
   * @property model
   * @type {Object}
   * @default undefined
   * @readOnly
   */

  /**
   * The path of the input value. Only needed for validation.
   *
   * @property valuePath
   * @type {String}
   * @default ''
   * @readOnly
   */
  valuePath: ''

});
