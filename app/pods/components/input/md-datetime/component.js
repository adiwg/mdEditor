/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { isBlank } from '@ember/utils';
import { set, computed, defineProperty, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { once } from '@ember/runloop';
import { assert, debug } from '@ember/debug';
import moment from 'moment';
import dayjs from 'dayjs';

const YEAR_GRID_SIZE = 12;

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

  // Year precision has no native HTML input type, so a small custom
  // year-grid popover restores the picker UX the old bootstrap
  // datetimepicker gave for this case.
  @tracked isYearPickerOpen = false;
  @tracked _yearGridStart = null;

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

  didInsertElement() {
    super.didInsertElement(...arguments);

    this._handleOutsideClick = (event) => {
      if (this.isYearPickerOpen && !this.element.contains(event.target)) {
        set(this, 'isYearPickerOpen', false);
      }
    };
    document.addEventListener('click', this._handleOutsideClick, true);
  }

  willDestroyElement() {
    document.removeEventListener('click', this._handleOutsideClick, true);
    super.willDestroyElement(...arguments);
  }

  get inputType() {
    return inputTypeForFormat(this.format);
  }

  /**
   * The actual `type` attribute rendered on the native input. Year
   * precision uses 'text' rather than 'number' -- the up/down spinner a
   * `number` input gets is not a usable substitute for picking a year,
   * so a custom year-grid popover is offered alongside it instead.
   */
  get htmlInputType() {
    return this.inputType === 'number' ? 'text' : this.inputType;
  }

  get isYearInput() {
    return this.inputType === 'number';
  }

  get selectedYear() {
    const date = this._date;
    return date && date.isValid?.() ? date.year() : null;
  }

  get yearGridStart() {
    if (this._yearGridStart !== null) {
      return this._yearGridStart;
    }

    const year = this.selectedYear ?? new Date().getFullYear();

    return year - 5;
  }

  get yearGridEnd() {
    return this.yearGridStart + YEAR_GRID_SIZE - 1;
  }

  get yearGridYears() {
    const start = this.yearGridStart;

    return Array.from({ length: YEAR_GRID_SIZE }, (_, i) => start + i);
  }

  @action
  toggleYearPicker() {
    set(this, 'isYearPickerOpen', !this.isYearPickerOpen);
  }

  @action
  prevYearDecade() {
    set(this, '_yearGridStart', this.yearGridStart - YEAR_GRID_SIZE);
  }

  @action
  nextYearDecade() {
    set(this, '_yearGridStart', this.yearGridStart + YEAR_GRID_SIZE);
  }

  @action
  selectYear(year) {
    set(this, '_date', String(year));
    set(this, 'isYearPickerOpen', false);
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
    set(this, '_yearGridStart', null);
    set(this, 'isYearPickerOpen', false);
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
