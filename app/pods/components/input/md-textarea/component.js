/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import { computed, defineProperty } from '@ember/object';
import { alias, not, notEmpty, and, or } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { assert, debug } from '@ember/debug';

export default Component.extend({
  /**
   * Input, edit, display a multi-line, expandable, text area.
   *
   * @class md-textarea
   * @constructor
   */

  init() {
    this._super(...arguments);

    let model = this.model;
    let valuePath = this.valuePath;

    if (isBlank(model) !== isBlank(valuePath)) {
      assert(
        `You must supply both model and valuePath to ${this.toString()} or neither.`
      );
    }

    if (!isBlank(model)) {
      if (this.get(`model.${valuePath}`) === undefined) {
        debug(`model.${valuePath} is undefined in ${this.toString()}.`);

        //Ember.run.once(()=>model.set(valuePath, ""));
      }

      defineProperty(this, 'value', alias(`model.${valuePath}`));

      defineProperty(
        this,
        'validation',
        alias(`model.validations.attrs.${valuePath}`).readOnly()
      );

      defineProperty(
        this,
        'required',
        computed(
          'validation.options.presence{presence,disabled}',
          'disabled',
          function () {
            return (
              !this.disabled &&
              this.get('validation.options.presence.presence') &&
              !this.get('validation.options.presence.disabled')
            );
          }
        ).readOnly()
      );

      defineProperty(
        this,
        'notValidating',
        not('validation.isValidating').readOnly()
      );

      defineProperty(this, 'hasContent', notEmpty('value').readOnly());

      defineProperty(
        this,
        'hasWarnings',
        notEmpty('validation.warnings').readOnly()
      );

      defineProperty(
        this,
        'isValid',
        and('hasContent', 'validation.isTruelyValid').readOnly()
      );

      defineProperty(
        this,
        'shouldDisplayValidations',
        or('showValidations', 'didValidate', 'hasContent').readOnly()
      );

      defineProperty(
        this,
        'showErrorClass',
        and(
          'notValidating',
          'showErrorMessage',
          'hasContent',
          'validation'
        ).readOnly()
      );

      defineProperty(
        this,
        'showErrorMessage',
        and('shouldDisplayValidations', 'validation.isInvalid').readOnly()
      );

      defineProperty(
        this,
        'showWarningMessage',
        and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly()
      );
    }
  },

  attributeBindings: ['data-spy'],
  classNames: ['md-textarea'],
  classNameBindings: ['label:form-group', 'required', 'embedded:md-embedded'],

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
  placeholder: 'Select one option',

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
   * Toggle expand state
   *
   * @property isExpanded
   * @type Boolean
   * @default true
   */
  isExpanded: true,

  /**
   * Enable collapse of the textarea
   *
   * @property isCollapsible
   * @type Boolean
   * @default false
   */
  isCollapsible: false,
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
   * @property inputClass
   * @type {string}
   * @default 'form-control'
   */
  inputClass: 'form-control',

  _didInsertArea() {
    this.scheduleMeasurement();
  },

  /**
   * Whether to show the infotip
   *
   * @property infotip
   * @type Boolean
   * @default false
   */
  infotip: false,

  /**
   * Determines whether infotip is rendered
   *
   * @property showInfotip
   * @type {Boolean}
   * @default "false"
   * @readOnly
   * @category computed
   * @requires placeholder,infotip
   */
  showInfotip: and('placeholder', 'infotip'),
});
