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
   * Datetime control with dropdown calendar.
   * Based on Bootstrap datetime picker.
   *
   *  @module mdeditor
   * @submodule components-input
   * @class md-datetime
   * @constructor
   */

  init() {
    this._super(...arguments);

    let model = this.get('model');
    let valuePath = this.get('valuePath');

    if(isBlank(model) !== isBlank(valuePath)) {
      assert(
        `You must supply both model and valuePath to ${this.toString()} or neither.`
      );
    }

    if(!isBlank(model)) {
      if(this.get(`model.${valuePath}`) === undefined) {
        Ember.debug(
          `model.${valuePath} is undefined in ${this.toString()}.`
        );
      }

      defineProperty(this, 'date', computed.alias(`model.${valuePath}`));

      defineProperty(this, 'validation', computed.alias(
          `model.validations.attrs.${valuePath}`)
        .readOnly());

      defineProperty(this, 'required', computed(
          'validation.options.presence.presence',
          'validation.options.presence.disabled',
          function () {
            return this.get('validation.options.presence.presence') &&
              !this.get('validation.options.presence.disabled');
          })
        .readOnly());

      defineProperty(this, 'notValidating', computed.not(
          'validation.isValidating')
        .readOnly());

      defineProperty(this, 'hasContent', computed.notEmpty('value')
        .readOnly());

      defineProperty(this, 'hasWarnings', computed.notEmpty(
          'validation.warnings')
        .readOnly());

      defineProperty(this, 'isValid', computed.and('hasContent',
          'validation.isTruelyValid')
        .readOnly());

      defineProperty(this, 'shouldDisplayValidations', computed.or(
          'showValidations', 'didValidate',
          'hasContent')
        .readOnly());

      defineProperty(this, 'showErrorClass', computed.and('notValidating',
          'showErrorMessage',
          'hasContent', 'validation')
        .readOnly());

      defineProperty(this, 'showErrorMessage', computed.and(
          'shouldDisplayValidations',
          'validation.isInvalid')
        .readOnly());

      defineProperty(this, 'showWarningMessage', computed.and(
          'shouldDisplayValidations',
          'hasWarnings', 'isValid')
        .readOnly());
    }
  },
  classNames: ['md-datetime', 'md-input-input'],
  classNameBindings: ['label:form-group', 'required'],

  /**
   * Datetime string passed in, edited, and returned.
   *
   * @property date
   * @type String
   * @default null
   * @return String
   */
  date: null,

  /**
   * Format of date string for property 'date'.
   *
   * @property format
   * @type String
   * @default 'YYYY-MM-DD'
   */
  format: 'YYYY-MM-DD',

  /**
   * The string to display when no datetime is selected.
   *
   * @property placeholder
   * @type String
   * @default 'Enter date or datetime'
   */
  placeholder: "Enter date or datetime",

  /**
   * Form label for datetime input.
   *
   * @property label
   * @type String
   * @default null
   */
  label: null,

  /**
   * Icons to be used by the datetime picker and calendar.
   * Icons can be set for time, date, up, down, previous, next,
   * and close.
   * The default icons are chosen from Font Awesome icons
   *
   * @property calendarIcons
   * @type Object
   * @default 'calendarIcons'
   */
  calendarIcons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-chevron-up",
    down: "fa fa-chevron-down",
    previous: "fa fa-angle-double-left",
    next: "fa fa-angle-double-right",
    close: "fa fa-times"
  }

});
