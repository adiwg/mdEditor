/**
 * @module mdeditor
 * @submodule components-input
 */

import { notEmpty, alias } from '@ember/object/computed';

import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { observer } from '@ember/object';
import { once } from '@ember/runloop';
import dayjs from 'dayjs';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  start: [
    validator('presence', {
      presence: true,
      disabled: notEmpty('model.end'),
      ignoreBlank: true,
    }),
  ],
  end: [
    validator('date', {
      onOrAfter: alias('model.start'),
      isWarning: true,
    }),
    validator('presence', {
      presence: true,
      disabled: notEmpty('model.start'),
      ignoreBlank: true,
    }),
  ],
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    this.set('precisionOptions', [
      { value: 'Year', name: 'Year' },
      { value: 'Month', name: 'Month' },
      { value: 'Day', name: 'Day' },
      { value: 'Time', name: 'Time' },
    ]);

    this.setPrecisionBasedOnDate();
  },

  selectedPrecision: null,
  selectedFormat: 'YYYY-MM-DDTHH:mm:ssZ',

  selectedPrecisionChanged: observer('selectedPrecision', function () {
    const startDate = this.start;
    const endDate = this.end;
    if (!startDate || !endDate) return;

    const parsedStartDate = dayjs(startDate);
    const parsedEndDate = dayjs(endDate);
    let newStartDate, newEndDate;

    switch (this.selectedPrecision) {
      case 'Time':
        newStartDate = parsedStartDate.format('YYYY-MM-DD HH:mm:ss');
        newEndDate = parsedEndDate.format('YYYY-MM-DD HH:mm:ss');
        this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
        break;
      case 'Day':
        newStartDate = parsedStartDate.format('YYYY-MM-DD');
        newEndDate = parsedEndDate.format('YYYY-MM-DD');
        this.set('selectedFormat', 'YYYY-MM-DD');
        break;
      case 'Month':
        newStartDate = parsedStartDate.format('YYYY-MM');
        newEndDate = parsedEndDate.format('YYYY-MM');
        this.set('selectedFormat', 'YYYY-MM');
        break;
      case 'Year':
        newStartDate = parsedStartDate.format('YYYY');
        newEndDate = parsedEndDate.format('YYYY');
        this.set('selectedFormat', 'YYYY');
        break;
      default:
        newStartDate = parsedStartDate.format('YYYY-MM-DD HH:mm:ss');
        newEndDate = parsedEndDate.format('YYYY-MM-DD HH:mm:ss');
        this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
        break;
    }

    if (newStartDate !== startDate) {
      this.set('start', newStartDate);
    }
    if (newEndDate !== endDate) {
      this.set('end', newEndDate);
    }
  }),

  setPrecisionBasedOnDate() {
    const date = this.start;
    if (!date) {
      this.set('selectedPrecision', 'Year');
      this.set('selectedFormat', 'YYYY');
      return;
    }
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Time');
      this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
    } else if (/\d{4}-\d{2}-\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Day');
      this.set('selectedFormat', 'YYYY-MM-DD');
    } else if (/\d{4}-\d{2}/.test(date)) {
      this.set('selectedPrecision', 'Month');
      this.set('selectedFormat', 'YYYY-MM');
    } else if (/\d{4}/.test(date)) {
      this.set('selectedPrecision', 'Year');
      this.set('selectedFormat', 'YYYY');
    } else {
      this.set('selectedPrecision', 'Time');
      this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
    }
  },

  /**
   * Date range with start date and end date fields.
   *
   * ```handlebars
   * \{{input/md-date-range
   *   startDateTime
   *   endDateTime=false
   * }}
   * ```
   *
   * @class md-date-range
   * @extends Ember.Component
   * @constructor
   */

  classNameBindings: ['formInline'],

  /**
   * If true, render the fields inline
   *
   * @property startDateTime
   * @type {Boolean}
   * @default true
   */
  formInline: true,

  /**
   * The value for the start datetime
   *
   * @property startDateTime
   * @type {String|Date|moment}
   * @default moment().hour(0).second(0).minute(0)
   * @required
   */
  start: computed('startDateTime', {
    get() {
      let dt = this.startDateTime;
      return dt === undefined ? null : dt;
    },
    set(key, value) {
      once(this, function () {
        set(this, 'startDateTime', value);
        return value;
      });
    },
  }),

  /**
   * The value for the end datetime
   *
   * @property endDateTime
   * @type {String|Date|moment}
   * @default moment().hour(0).second(0).minute(0)
   * @required
   */
  end: computed('endDateTime', {
    get() {
      let dt = this.endDateTime;
      return dt === undefined ? null : dt;
    },
    set(key, value) {
      once(this, function () {
        set(this, 'endDateTime', value);
        return value;
      });
    },
  }),
});
