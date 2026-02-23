/**
 * @module mdeditor
 * @submodule components-input
 */

import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { isBlank } from '@ember/utils';
import { set, computed, defineProperty } from '@ember/object';
import { once } from '@ember/runloop';
import { assert, debug } from '@ember/debug';
import { action } from '@ember/object';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@classic
export default class MdDatetimeComponent extends Component {
  /**
   * Datetime control using native HTML date inputs.
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
  useCurrent = 'day';
  showTodayButton = true;
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
        'inputValue',
        computed(`model.${valuePath}`, 'format', function () {
          let rawValue = this.model?.[valuePath];
          return this._formatForInput(rawValue);
        })
      );
    } else {
      defineProperty(
        this,
        'inputValue',
        computed('date', 'format', function () {
          let rawValue = this.date;
          return this._formatForInput(rawValue);
        })
      );
    }
  }

  get inputType() {
    let fmt = this.format || 'YYYY-MM-DDTHH:mm:ssZ';
    if (fmt.includes('HH') || fmt.includes('hh') || fmt.includes('mm:ss')) {
      return 'datetime-local';
    } else if (fmt.includes('DD') || fmt.includes('dd')) {
      return 'date';
    } else if (fmt.includes('MM')) {
      return 'month';
    }
    return 'number';
  }

  _formatForInput(rawValue) {
    if (isBlank(rawValue)) {
      return '';
    }

    let d = dayjs(rawValue);
    if (!d.isValid()) {
      return '';
    }

    let fmt = this.format || 'YYYY-MM-DDTHH:mm:ssZ';
    if (fmt.includes('HH') || fmt.includes('hh') || fmt.includes('mm:ss')) {
      return d.format('YYYY-MM-DDTHH:mm:ss');
    } else if (fmt.includes('DD') || fmt.includes('dd')) {
      return d.format('YYYY-MM-DD');
    } else if (fmt.includes('MM')) {
      return d.format('YYYY-MM');
    }
    return d.format('YYYY');
  }

  _setDateValue(value) {
    let model = this.model;
    let valuePath = this.valuePath;

    if (!isBlank(model) && !isBlank(valuePath)) {
      once(this, function () {
        set(this, `model.${valuePath}`, value);
      });
    } else {
      once(this, function () {
        set(this, 'date', value);
      });
    }

    if (this.change) {
      this.change(value ? new Date(value) : null);
    }
  }

  @action
  handleDateChange(event) {
    let value = event.target.value;
    if (isBlank(value)) {
      this._setDateValue(null);
      return;
    }

    let inputType = this.inputType;
    let formattedDate;

    if (inputType === 'number') {
      // Year only - just use the raw value
      formattedDate = value;
    } else {
      let d = dayjs(value);
      if (!d.isValid()) return;

      if (this.precision === 'Time') {
        formattedDate = d.format('YYYY-MM-DDTHH:mm:ss[Z]');
      } else {
        formattedDate = d.format(this.format);
      }
    }

    this._setDateValue(formattedDate);
  }

  @action
  handleClear() {
    this._setDateValue(null);
  }

  @action
  handleToday() {
    let now = dayjs();
    let formattedDate;
    if (this.precision === 'Time') {
      formattedDate = now.format('YYYY-MM-DDTHH:mm:ss[Z]');
    } else {
      formattedDate = now.format(this.format);
    }
    this._setDateValue(formattedDate);
  }
}
