/**
 * @module mdeditor
 * @submodule components-input
 */

import { alias, not, notEmpty, and, or } from '@ember/object/computed';

import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { get, set, computed, defineProperty } from '@ember/object';
import { once } from '@ember/runloop';
import { assert, debug } from '@ember/debug';
import moment from 'moment';

export default Component.extend({

  /**
   * Datetime control with dropdown calendar.
   * Based on Bootstrap datetime picker.
   *
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
        debug(
          `model.${valuePath} is undefined in ${this.toString()}.`
        );
      }

      defineProperty(this, 'date', computed(`model.${valuePath}`, {
        get() {
          return moment(get(this, `model.${valuePath}`));
        },
        set(key, value) {
          once(this, () => {
            this.set(`model.${valuePath}`, value);
          });
          return value;
        }
      }));

      defineProperty(this, 'validation', alias(
          `model.validations.attrs.${valuePath}`)
        .readOnly());

      defineProperty(this, 'required', computed(
          'validation.options.presence.presence',
          'validation.options.presence.disabled',
          function() {
            return this.get('validation.options.presence.presence') &&
              !this.get('validation.options.presence.disabled');
          })
        .readOnly());

      defineProperty(this, 'notValidating', not(
          'validation.isValidating')
        .readOnly());

      defineProperty(this, 'hasContent', notEmpty('date')
        .readOnly());

      defineProperty(this, 'hasWarnings', notEmpty(
          'validation.warnings')
        .readOnly());

      defineProperty(this, 'isValid', and('hasContent',
          'validation.isTruelyValid')
        .readOnly());

      defineProperty(this, 'shouldDisplayValidations', or(
          'showValidations', 'didValidate',
          'hasContent')
        .readOnly());

      defineProperty(this, 'showErrorClass', and('notValidating',
          'showErrorMessage',
          'hasContent', 'validation')
        .readOnly());

      defineProperty(this, 'showErrorMessage', and(
          'shouldDisplayValidations',
          'validation.isInvalid')
        .readOnly());

      defineProperty(this, 'showWarningMessage', and(
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
   * On show, will set the picker to the current date/time
   *
   * @property useCurrent
   * @type Boolean
   * @default false
   */
  useCurrent: false,

  /**
   * Icons to be used by the datetime picker and calendar.
   * Icons can be set for time, date, up, down, previous, next, clear,
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
    close: "fa fa-times",
    clear: "fa fa-trash"
  },

  actions: {
    updateDate(date) {
      if(isBlank(date)){
        set(this, 'date', null);

        return;
      }

      let utc = moment(date);

      //utc.add(utc.utcOffset(), 'minutes');

      if(utc && utc.toISOString() !== this.get('date')) {

        //once(this, function() {
          set(this, 'date', utc.toISOString());
        //});
      }
    }
  }
});
