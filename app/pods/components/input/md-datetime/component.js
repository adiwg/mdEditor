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
import moment from 'moment';
import dayjs from 'dayjs';

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
  useCurrent = 'day';
  showTodayButton = true;
  showClear = true;

  constructor() {
    super(...arguments);

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
        computed(`model.${valuePath}`, {
          get() {
            let val = this.model?.[valuePath];
            return val ? moment(val, this.altFormat || null) : null;
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
        computed('date', {
          get() {
            let val = this.date;
            return val ? moment(val, this.altFormat || null) : null;
          },
          set(key, value) {
            let formatted = this.formatValue(value, 'date');
            return formatted;
          },
        })
      );
    }
  }

  get calendarIcons() {
    return {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      previous: 'fa fa-angle-double-left',
      next: 'fa fa-angle-double-right',
      close: 'fa fa-times',
      clear: 'fa fa-trash',
    };
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
      formattedDate = dayjs(value).format(this.format);
    }

    // Use bracket notation for dynamic property access
    let currentValue = target.includes('.') ?
      target.split('.').reduce((obj, key) => obj?.[key], this) :
      this[target];

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
