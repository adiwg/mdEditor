/**
 * @module mdeditor
 * @submodule components-input
 */

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
      }

      defineProperty(
        this,
        '_date',
        computed(`model.${valuePath}`, {
          get() {
            let val = get(this, `model.${valuePath}`);
            return val ? moment(val, this.get('altFormat' || null)) : null;
          },
          set(key, value) {
            let formatted = this.formatValue(value, `model.${valuePath}`);
            return formatted;
          },
        })
      );

      // ... (other property definitions related to model and validation)
    } else {
      defineProperty(
        this,
        '_date',
        computed('date', {
          get() {
            let val = this.date;
            return val ? moment(val, this.get('altFormat' || null)) : null;
          },
          set(key, value) {
            let formatted = this.formatValue(value, 'date');
            return formatted;
          },
        })
      );
    }
  },
  classNames: ['md-datetime', 'md-input-input'],
  classNameBindings: ['label:form-group', 'required'],

  date: null,
  format: 'YYYY-MM-DD HH:mm:ss', // Change the format to include time
  placeholder: 'Enter date and time',
  label: null,
  useCurrent: 'day',
  showTodayButton: true,
  showClear: true,

  formatValue(value, target) {
    if (isBlank(value)) {
      once(this, function () {
        set(this, target, null);
      });
      return value;
    }

    let mom = moment(value);

    if (this.altFormat) {
      let alt = mom.format(this.altFormat);
      once(this, function () {
        set(this, target, alt);
      });
      return alt;
    }

    if (mom && mom.toISOString() !== this.get(target)) {
      once(this, function () {
        set(this, target, mom.toISOString());
      });
    }

    return mom;
  },

  calendarIcons: computed(function () {
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
  }),
});
