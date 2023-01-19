/**
 * @module mdeditor
 * @submodule components-input
 */

import {
  alias,
  not,
  notEmpty,
  and,
  or
} from '@ember/object/computed';

import Component from '@ember/component';
import {
  isBlank
} from '@ember/utils';
import {
  get,
  set,
  computed,
  defineProperty
} from '@ember/object';
import {
  once
} from '@ember/runloop';
import {
  assert,
  debug
} from '@ember/debug';
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

    let model = this.model;
    let valuePath = this.valuePath;

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

      defineProperty(this, '_date', computed(`model.${valuePath}`, {
        get() {
          let val = get(this, `model.${valuePath}`);

          return val ? moment(val, this.get('altFormat' || null)) :
            null;
        },
        set(key, value) {
          let formatted = this.formatValue(value,
            `model.${valuePath}`);

          return formatted;
        }
      }));

      defineProperty(this, 'validation', alias(
          `model.validations.attrs.${valuePath}`)
        .readOnly());

      defineProperty(this, 'required', computed(
          'validation.options.presence.{presence,disabled}',
          function () {
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
    } else {
      defineProperty(this, '_date', computed('date', {
        get() {
          let val = this.date;

          return val ? moment(val, this.get('altFormat' || null)) :
            null;
        },
        set(key, value) {
          let formatted = this.formatValue(value, 'date');

          return formatted;
        }
      }));
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
   * @default 'day'
   */
  useCurrent: 'day',

  /**
   * Show the Today button in the icon toolbar.
   *
   * @property showTodayButton
   * @type Boolean
   * @default true
   */
  showTodayButton: true,

  /**
   * Show the clear button in the icon toolbar.
   *
   * @property showClear
   * @type Boolean
   * @default true
   */
  showClear: true,

  formatValue(value, target) {
    if(isBlank(value)) {
      once(this, function () {
        set(this, target, null);
      });

      return value;
    }

    let mom = moment(value);

    if(this.altFormat) {
      let alt = mom.format(this.altFormat);

      once(this, function () {
        set(this, target, alt);
      });
      return alt;
    }
    //utc.add(utc.utcOffset(), 'minutes');

    if(mom && mom.toISOString() !== this.get(target)) {

      once(this, function () {
        set(this, target, mom.toISOString());
      });
    }

    return mom;
  },

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
  calendarIcons: computed(function () {
    return {
      time: "fa fa-clock-o",
      date: "fa fa-calendar",
      up: "fa fa-chevron-up",
      down: "fa fa-chevron-down",
      previous: "fa fa-angle-double-left",
      next: "fa fa-angle-double-right",
      close: "fa fa-times",
      clear: "fa fa-trash"
    };
  })
});
