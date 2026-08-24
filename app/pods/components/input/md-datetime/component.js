/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { isBlank } from '@ember/utils';
import { set, computed, defineProperty, action } from '@ember/object';
import { once } from '@ember/runloop';
import { assert, debug } from '@ember/debug';
import moment from 'moment';
import dayjs from 'dayjs';

/**
 * Native HTML input[type] to use for a given dayjs/moment format string.
 * Checked in order: a time token wins over date/month/year tokens since
 * the format strings used in this app always combine them (e.g.
 * 'YYYY-MM-DDTHH:mm:ssZ').
 */
function inputTypeForFormat(format) {
  const fmt = format || '';
  if (/[Hhms]/.test(fmt)) return 'datetime-local';
  if (/D/.test(fmt)) return 'date';
  if (/M/.test(fmt)) return 'month';
  if (/Y/.test(fmt)) return 'number';
  return 'datetime-local';
}

@classic
export default class MdDatetimeComponent extends Component {
  /**
   * Datetime control with dropdown calendar.
   * Based on Bootstrap datetime picker.
   *
   * @class md-datetime
   * @constructor
   */

  classNames = ['md-datetime', 'md-input-input'];
  classNameBindings = ['label:form-group', 'required'];

  date = null;
  format = 'YYYY-MM-DDTHH:mm:ssZ';
  placeholder = 'Enter date and time';
  label = null;
  showClear = true;

  init() {
    super.init(...arguments);

    let model = this.model;
    let valuePath = this.valuePath;

    if (isBlank(model) !== isBlank(valuePath)) {
      assert(
        `You must supply both model and valuePath to ${this.toString()} or neither.`
      );
    }

    if (!isBlank(model)) {
      if (this.model?.[valuePath] === undefined) {
        debug(`model.${valuePath} is undefined in ${this.toString()}.`);
      }

      defineProperty(
        this,
        '_date',
        computed(`model.${valuePath}`, 'extraFormats.[]', {
          get() {
            let val = this.model?.[valuePath];
            if (!val) return null;
            if (val instanceof Date) return moment.utc(val);
            let formats = [
              this.altFormat,
              this.format,
              ...(this.extraFormats || []),
            ].filter(Boolean);
            return moment(val, formats.length ? formats : null);
          },
          set(key, value) {
            let formatted = this.formatValue(value, `model.${valuePath}`);
            return formatted;
          },
        })
      );
    } else {
      defineProperty(
        this,
        '_date',
        computed('date', 'extraFormats.[]', {
          get() {
            let val = this.date;
            if (!val) return null;
            if (val instanceof Date) return moment.utc(val);
            let formats = [
              this.altFormat,
              this.format,
              ...(this.extraFormats || []),
            ].filter(Boolean);
            return moment(val, formats.length ? formats : null);
          },
          set(key, value) {
            let formatted = this.formatValue(value, 'date');
            return formatted;
          },
        })
      );
    }
  }

  get inputType() {
    return inputTypeForFormat(this.format);
  }

  /**
   * Value formatted for the native input[type] in `inputType` - the
   * browser requires a specific format per input type, independent of
   * `format`/`altFormat` (which only control the value written back to
   * the model, via `formatValue`).
   */
  get nativeValue() {
    const date = this._date;
    if (!date || !date.isValid?.()) {
      return '';
    }

    switch (this.inputType) {
      case 'date':
        return date.format('YYYY-MM-DD');
      case 'month':
        return date.format('YYYY-MM');
      case 'number':
        return date.format('YYYY');
      case 'datetime-local':
      default:
        return date.format('YYYY-MM-DDTHH:mm');
    }
  }

  @action
  handleInput(event) {
    set(this, '_date', event.target.value);
  }

  @action
  clear() {
    set(this, '_date', null);
  }

  formatValue(value, target) {
    if (isBlank(value)) {
      once(this, 'setTargetToNull', target);
      return value;
    }

    let formattedDate;
    if (this.precision === 'Time') {
      formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss[Z]');
    } else {
      formattedDate = dayjs(value).format(this.altFormat || this.format);
    }

    // Use bracket notation for dynamic property access
    let currentValue = target.includes('.')
      ? target.split('.').reduce((obj, key) => obj?.[key], this)
      : this[target];

    if (formattedDate !== currentValue) {
      once(this, 'updateFormattedDate', formattedDate, target);
    }

    return formattedDate;
  }

  setTargetToNull(target) {
    set(this, target, null);
  }

  updateFormattedDate(formattedDate, target) {
    set(this, target, formattedDate);
  }
}
