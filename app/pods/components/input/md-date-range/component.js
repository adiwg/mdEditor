/**
 * @module mdeditor
 * @submodule components-input
 */

import { notEmpty, alias } from '@ember/object/computed';

import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { observer } from '@ember/object';
import { once } from '@ember/runloop';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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
    let newStartDate, newEndDate;

    switch (this.selectedPrecision) {
      case 'Year':
        this.set('selectedFormat', 'YYYY');
        if (startDate) newStartDate = dayjs(startDate).format('YYYY');
        if (endDate) newEndDate = dayjs(endDate).format('YYYY');
        break;
      case 'Month':
        this.set('selectedFormat', 'YYYY-MM');
        if (startDate) newStartDate = dayjs(startDate).format('YYYY-MM');
        if (endDate) newEndDate = dayjs(endDate).format('YYYY-MM');
        break;
      case 'Day':
        this.set('selectedFormat', 'YYYY-MM-DD');
        if (startDate) newStartDate = dayjs(startDate).format('YYYY-MM-DD');
        if (endDate) newEndDate = dayjs(endDate).format('YYYY-MM-DD');
        break;
      case 'Time':
      default:
        this.set('selectedFormat', 'YYYY-MM-DDTHH:mm:ssZ');
        if (startDate)
          newStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ');
        if (endDate) newEndDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ');
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
    if (/^\d{4}$/.test(date)) {
      this.set('selectedPrecision', 'Year');
      this.set('selectedFormat', 'YYYY');
    } else if (/^\d{4}-\d{2}$/.test(date)) {
      this.set('selectedPrecision', 'Month');
      this.set('selectedFormat', 'YYYY-MM');
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      this.set('selectedPrecision', 'Day');
      this.set('selectedFormat', 'YYYY-MM-DD');
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
